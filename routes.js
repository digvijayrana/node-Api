const express = require('express');
const router = express.Router();
const database = require('./database');





router.post("/candidateData", async (req, res) => {
    try{
    const {name,email,address} = req.body
    var insertQuery = `insert into candidate(name,email,address) values('${name}','${email}','${address}'); `;
    database.connect();
    var connection = await database.connect()

        await connection.query(insertQuery, (error, rows, filed) => {
        if (error) {
        database.disConnect();
        return res.status(500).json({
        status:false,
        message:error.message
    });
    }
    return res.status(200).json({
        status: true,
        message: 'successfully',
    
        })
    })
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            status: false,
            message: e.message
        });
    }
});

router.post("/testScore", async (req, res) => {
    try{
    const {first,second,third,candidateId} = req.body
    var insertQuery = `insert into test(firstRound,secondRound,thirdRound,candidateId) values('${first}','${second}','${third}','${candidateId}'); `;
    database.connect();
    var connection = await database.connect()

        await connection.query(insertQuery, (error, rows, filed) => {
        if (error) {
        database.disConnect();
        return res.status(500).json({
        status:false,
        message:error.message
    });
    }
    return res.status(200).json({
        status: true,
        message: 'successfully',
    
        })
    })
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            status: false,
            message: e.message
        });
    }
});


router.get("/details", async (req, res) => {
    try{
   
    var selectQuery = `select candidate.name, candidate.email, max(test.firstRound+test.secondRound+test.thirdRound) as heightScore, ((test.firstRound+test.secondRound+test.thirdRound)/3) as averageScore from candidate
    inner join test  on candidate.id = test.candidateId group by test.id order by heightScore desc ;`;
    database.connect();
    var connection = await database.connect()

        await connection.query(selectQuery, (error, rows, filed) => {
        if (error) {
        database.disConnect();
        return res.status(500).json({
        status:false,
        message:error.message
    });
    }
    return res.status(200).json({
        status: true,
        message: 'successfully',
        data:rows
        })
    })
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            status: false,
            message: e.message
        });
    }
});
module.exports = router;
