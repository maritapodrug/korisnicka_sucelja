
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const glob = require('glob');

const INPUT_GLOB = 'public/**/*.{jpg,jpeg,png}'; 
const OUTPUT_SUFFIXES = ['.webp', '.avif'];
const BLUR_WIDTH = 20; 

async function convertFile(file) {
  const extname = path.extname(file);
  const dirname = path.dirname(file);
  const basename = path.basename(file, extname);


  const stat = fs.statSync(file);
  if (stat.size < 10 * 1024) {
    console.log(`Preskačem malu sliku: ${file}`);
    return null;
  }

  const results = {
    original: file,
    converted: {},
    blurDataURL: null,
  };


  for (const suffix of OUTPUT_SUFFIXES) {
    const out = path.join(dirname, `${basename}${suffix}`);
    try {
      if (suffix === '.webp') {
        await sharp(file)
          .webp({ quality: 75 })
          .toFile(out);
      } else if (suffix === '.avif') {
        await sharp(file)
          .avif({ quality: 60 })
          .toFile(out);
      }
      results.converted[suffix] = out;
      console.log(`Konvertirano: ${file} -> ${out}`);
    } catch (err) {
      console.error(`Greška kod konverzije ${file} -> ${suffix}:`, err);
    }
  }

  
  try {
    const buffer = await sharp(file)
      .resize(BLUR_WIDTH)
      .webp({ quality: 40 })
      .toBuffer();
    const base64 = buffer.toString('base64');
    results.blurDataURL = `data:image/webp;base64,${base64}`;
  } catch (err) {
    console.error('Greška kod blur generiranja:', err);
  }

  return results;
}

function run() {
  const files = glob.sync(INPUT_GLOB, { nodir: true });
  console.log(`Nađeno ${files.length} slika...`);
  (async () => {
    const all = [];
    for (const f of files) {
      const res = await convertFile(f);
      if (res) all.push(res);
    }

    const outPath = path.join(__dirname, 'image-manifest.json');
    fs.writeFileSync(outPath, JSON.stringify(all, null, 2));
    console.log(`Završeno. Manifest spremljen u ${outPath}`);
  })();
}

run();