import Database from 'better-sqlite3';

function extractImageUrls() {
  const db = new Database('database.db', { readonly: true });
  
  // Fetch user profile image URLs
  console.log('User Profile Image URLs:');
  const userStmt = db.prepare('SELECT profile_image_url FROM users WHERE profile_image_url IS NOT NULL');
  const userResults = userStmt.all();
  userResults.forEach(user => {
    console.log((user as { profile_image_url: string }).profile_image_url);
  });

  // Fetch item image URLs
  console.log('\nItem Image URLs:');
  const itemStmt = db.prepare('SELECT image FROM items WHERE image IS NOT NULL');
  const itemResults = itemStmt.all();
  itemResults.forEach(item => {
    console.log((item as { image: string }).image);
  });

  db.close();
}

extractImageUrls();
