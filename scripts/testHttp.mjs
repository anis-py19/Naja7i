import http from 'http';
import https from 'https';

// Test if Vite or dev server is running on 5173 or other port
const ports = [5173, 3000, 4173, 5174];

ports.forEach(port => {
  const req = http.get(`http://localhost:${port}/FileFromMe/Anglais/الأسئلة-المعتادة-في-البكالوريا-في-اللغة-الإنجليزية-مترجمة-للغة-العربية.pdf`, (res) => {
    console.log(`Port ${port} status: ${res.statusCode}, contentType: ${res.headers['content-type']}`);
  });
  req.on('error', () => {
    // console.log(`Port ${port} not reachable`);
  });
});
