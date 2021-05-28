create table candidate(id int(10) PRIMARY KEY AUTO_INCREMENT,name varchar(200),email varchar(250) UNIQUE,address mediumtext);

create table candidate(id int(10) PRIMARY KEY AUTO_INCREMENT,name varchar(200),email varchar(250) UNIQUE,address mediumtext);

select  name from candidate where id = (
    select MAX(firstRound+secondRound+thirdRound) as total from test;
);
select candidate.name, candidate.email, max(test.firstRound+test.secondRound+test.thirdRound) as heightScore, ((test.firstRound+test.secondRound+test.thirdRound)/3) as averageScore from candidate
inner join test  on candidate.id = test.candidateId group by test.id order by heightScore desc ;

