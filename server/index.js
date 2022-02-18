const express= require("express");
const app= express();
const bodyParser =require("body-parser");
const cors= require("cors");
const mysql=  require("mysql");

const db= mysql.createPool({
	
	host: "localhost",	
	user: "root",
	password: "",
	database: "cruddatabase",
});

 app.use(cors());
 app.use(express.json());
 app.use(bodyParser.urlencoded({extended: true}));
 
 //get data from database
 app.get("/api/get", (req,res)=>{
 	const sqlSelect= "SELECT * FROM mymoviereviews ";
 	db.query(sqlSelect, (err,result) => {
 		res.send(result);
 	})
 });


//Insert into database
app.post("/api/add",(req,res) =>{

	const movieName= req.body.movieName;
	const movieReview= req.body.movieReview;
  const sqlInsert= "INSERT INTO mymoviereviews (movieName, movieReview) VALUES (?,?) ";
  db.query(sqlInsert, [movieName, movieReview] ,(err, result) => {
  	
     console.log(result);

  })

});

//Update data in database
app.put("/api/update",(req,res)=>{
	const name= req.body.movieName;
	const review= req.body.movieReview;
	const sqlUpdate= "UPDATE mymoviereviews SET movieReview=?  WHERE movieName=?";
	db.query(sqlUpdate,[review,name],(err,result)=>{
		if(err) console.log(err);
	});
});

//delete data in database
app.delete("/api/delete/:movieName",(req,res)=>{
	const name= req.params.movieName;
	const sqlDelete = "DELETE FROM mymoviereviews WHERE movieName=?";
	db.query(sqlDelete, name, (err, result) =>{
		if(err) console.log(err);
	})
});


app.listen(3001, () =>{
	console.log("Running on port 3001");
});