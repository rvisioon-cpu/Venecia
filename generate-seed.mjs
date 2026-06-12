import fs from 'fs';

const fileContent = fs.readFileSync('/Users/andrespluska/Documents/freelance/venecia-showroom/src/data/floors.ts', 'utf8');

// Extract the floorsData array text
let floorsDataStr = fileContent.substring(fileContent.indexOf('export const floorsData: Floor[] = [') + 'export const floorsData: Floor[] = '.length);
floorsDataStr = floorsDataStr.substring(0, floorsDataStr.lastIndexOf('];') + 1);

const floorsData = eval(floorsDataStr);

let sql = 'DELETE FROM tours;\nDELETE FROM units;\nDELETE FROM floors;\n';

for (const floor of floorsData) {
  const floorId = `floor_${floor.id}`;
  sql += `INSERT INTO floors (id, name, level, type, image_path) VALUES ('${floorId}', '${floor.name}', ${floor.name === 'PB' ? 0 : (parseInt(floor.name.replace(/\D/g, '')) || 0)}, 'Piso', '${floor.floorPlanImage}');\n`;
  
  for (const unit of floor.units) {
    const unitId = `unit_${floor.id}_${unit.id.replace(/\\s+/g, '_').toLowerCase()}`;
    const coordinates = unit.x !== undefined && unit.y !== undefined ? JSON.stringify({ x: unit.x, y: unit.y, path: unit.path }) : (unit.path ? JSON.stringify({ path: unit.path }) : 'NULL');
    let state = unit.status === 'available' ? 'AVAILABLE' : (unit.status === 'sold' ? 'SOLD' : 'RESERVED');
    if (unit.id === 'Terraza') {
      state = 'COMMON_AREA';
    }
    const typeStr = unit.type === 'storage' ? 'STORAGE' : 'APARTMENT';
    const bedrooms = unit.bedrooms || 'NULL';
    const bathrooms = unit.bathrooms || 'NULL';
    const areaSqm = unit.dimensions || 'NULL';
    const tourUrl = unit.tourUrl ? `'${unit.tourUrl}'` : 'NULL';
    
    // SQLite JSON strings need single quotes escaped if they contain single quotes, but JSON doesn't contain single quotes usually (uses double quotes). 
    // We just need to wrap the JSON string in single quotes: '${coordinates}'
    const coordsSql = coordinates === 'NULL' ? 'NULL' : `'${coordinates}'`;
    
    sql += `INSERT INTO units (id, floor_id, identifier, type, bedrooms, bathrooms, area_sqm, coordinates, state, tour_url) VALUES ('${unitId}', '${floorId}', '${unit.id}', '${typeStr}', ${bedrooms}, ${bathrooms}, ${areaSqm}, ${coordsSql}, '${state}', ${tourUrl});\n`;
  }
}

fs.writeFileSync('src/lib/db/seed.sql', sql);
console.log('seed.sql generated!');
