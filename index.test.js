var supertest=require('supertest');
const request=supertest('localhost:5501/');

/*
test("GET felhasznalok",async()=>{
    const response=await request.get('felhasznalok');
    
    expect(response.status).toBe(200);
});


test("GET megrendelesek",async()=>{
    const response=await request.get('megrendelesek');
    
    expect(response.status).toBe(200);
});

test("GET termekek",async()=>{
    const response=await request.get('termekek');
    
    expect(response.status).toBe(200);
});




test("POST login",async ()=>{
    let body={
        "email":"TesztUser@example.hu",
        "jelszo":"user1234"
    }
    const response=await request.post('felhasznalo/login').send(body);
    
    expect(response.status).toBe(201);
});

test("POST register",async ()=>{
    let body={
        "nev": "Tesztelő Jest",
  "cim": "1234 Teszt Teszt utca 56.",
  "felhasznalonev": "Jest",
  "jelszo": "jestTest",
  "email": "Teszt@jest.hu",
 
    }
    const response=await request.post('felhasznalo').send(body);
    
    expect(response.status).toBe(201);
});

test("POST termekek",async ()=>{
    let body={
        "termekNev": "Fekete téli kabát",
        "meret": [
          "L",
          "S",
          "XL"
        ],
        "Ar": "36000",
        "link": "http://res.cloudinary.com/gb-web/image/upload/v1649323789/nt5auatmmwggpiciepbu.jpg",
        "Tipus": "Kabát"
 
    }
    const response=await request.post('termekek').send(body);
    
    expect(response.status).toBe(200);
});

test("POST megrendelesek",async ()=>{
    let body={
        
   
   "megrendelt_termekek":[{"termekId":"6242d4ccd0f09b9536623781","meret":"M","mennyiseg":1,"Ar":"7800"}],
    osszeg:7800,
    aktiv: false,
    lezart:false,
    
 
    }
    const response=await request.post('megrendelesek/625b57b07b4ec3045ced89fe').send(body);
    
    expect(response.status).toBe(200);
});
*/
/*
test("PUT megrendelesek fogadasa",async ()=>{
    
    const response=await request.put('megrendelesek/62642b6d5da750f7e4f0bbed');
    
    expect(response.status).toBe(200);
});

test("PUT megrendelesek lezarasa",async ()=>{
    
    const response=await request.put('megrendelesekLez/62642b6d5da750f7e4f0bbed');
    
    expect(response.status).toBe(200);
});
*/
test("DELETE megrendelesek",async ()=>{
    
    const response=await request.delete('megrendelesek/62642b6d5da750f7e4f0bbed');
    
    expect(response.status).toBe(200);
});
/*
test("PUT felhasznalok",async ()=>{
    let body={
        "nev": "Tesztelő Jest",
  "cim": "1234 Teszt Teszt utca 56.",
  "felhasznalonev": "Jest",
  "jelszo": "jestTest",
  "email": "Teszt@jest.hu",
 
    }
    const response=await request.put('felhasznalok/62642b6c0b785e0d2800db52').send(body);
    
    expect(response.status).toBe(200);
});

test("PUT Adminjog adás",async ()=>{
  
    const response=await request.put('allapotfel/62642b6c0b785e0d2800db52');
    
    expect(response.status).toBe(200);
}); 

test("PUT Adminjog elvétel",async ()=>{
   
    
    const response=await request.put('allapotle/62642b6c0b785e0d2800db52');
    
    expect(response.status).toBe(200);
});

test("PUT termekek",async ()=>{
    let body={
        "termekNev": "Fekete téli kabátt",
        "meret": [
          "L",
          "S",
          "XL"
        ],
        "Ar": "36000",
        "link": "http://res.cloudinary.com/gb-web/image/upload/v1649323789/nt5auatmmwggpiciepbu.jpg",
        "Tipus": "Kabát"
 
    }
    const response=await request.put('termekek/62642b6d5da750f7e4f0bbec').send(body);
    
    expect(response.status).toBe(200);
});*/

test("DELETE termekek",async ()=>{
    
    const response=await request.delete('termekek/62642b6d5da750f7e4f0bbec');
    
    expect(response.status).toBe(200);
});
test("DELETE felhasznalok",async ()=>{
    
    const response=await request.delete('felhasznalok/62642b6c0b785e0d2800db52');
    
    expect(response.status).toBe(200);
});