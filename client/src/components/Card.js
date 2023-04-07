import React from 'react'


const data = "music\tmelody\theadphones\tipod\t  listen\nphoto\tcamera\tflickr\tsnapshot  \tpost\ndance\tballet\trumba\tpoint \tballroom\nparty\tcelebrate\tbirthday\tnew years\tfun\tweekend\ndream\tsleep\trest\tbrain\tactivity\nmadonna\tbritney spears\tcelebrity\tpop\tsinger\tmusic\nqueen\tbee\tking\trock\tdrag\troyalty\nsubway\tsandwich\tshop\tfood\tinch\tjared\ntemple\tworship\tchurch\tpray\tpeace\tgod\ncorrect\twrong\tanswer\tright\tquestion\texact\ngentle\thard\tsoft\tcareful\tbreak\tcareless\ncab\tdriver\ttaxi\ttip\ttransport\tyellow\tnew york\ntape\tscotch\tduct\tplayer\tcd\tmusic\ngoogle\tyahoo\tinternet\tsearch engine\tgmail\tpublic\nannoying\tpainful\twords\trepeat\tkids\ttime\nbillionaire\tbill gates\tmoney\tcash\tjeff bezos\tloot\ncameron diaz\tfiona\tshrek\tblonde\tactress\tmary\nmarker\tdraw\tkids\tcrayola\twriting instrument\tart\nmoon\tsun\tplanet\tcircle\tspace\tarmstrong\nweek\tseven\tdays\tmonth\tcalendar\tyear\ntuxedo\tsuit\tprom\twedding\tbow-tie\tvest\nfireworks\t4th of july\tdiwali\tsparkle\tsky\tdisney\nstreak\twin\tnude\tloss\tsnapchat\trow\njack daniels\twhiskey\ttennessee\tcoke\tdrink\talcohol\ncrystal\tball\tglass\tkitchen\tfancy\tgift\nlanguage\tenglish\tfrench\tspeak\tspanish\tgreek\ncitizen\tkane\tpolice\tcountry\tperson\tcommon\nbritney spears\tshave\tbaby\tsinger\tpop star\tmusic\nhoop\tbasketball\thula\tearrings\tjump\tthrough\njelly\tsandwich\tpeanut butter\tsmuckers\tjam\twelch\nsuffice\tenough\tamount\tcomplete\tshould\ttime\nsoda\tcoke\tpop\tdrink\tcan\tvending machine\nrepublican\tgeorge bush\tparty\tpolitical\telephant\red\nwatermelon\tseeds\tjuice\tgreen\tpink\tfruit\nmilk\tcow\tdairy\tcereal\tcookies\tdrink\ncreme brule\tdessert\tfrench\tblow torch\tsugar\tcreamy\ncatwalk\tmodel\tfashiona show\trunway\theidi klum\tbruce\nairport\ttravel\tplane\ttransportation\tbus\ttrainfish\twater\tanimals\tocean\tlake\tpond\n";
const cardInfo = data.split("\n");
const cards = [];

for(let i = 0; i < cardInfo.length; i++){
    cards[i] = {
        id: i,
        data: cardInfo[i].split("\t"),
    }
}

function Card({ currCard, visibility }) {

    if(visibility){
        return(
            <div className="card">
                <p className="target"> {cards[currCard].data[0]} </p>
                <p> {cards[currCard].data[1]} </p>
                <p> {cards[currCard].data[2]} </p>
                <p> {cards[currCard].data[3]} </p>
                <p> {cards[currCard].data[4]} </p>
            </div>
        );
    }else{
        return(
            <div className="card hidden">
                <p className="target"> xxxx</p>
                <p> xxxx </p>
                <p> xxxx </p>
                <p> xxxx </p>
                <p> xxxx </p>
            </div>
        );
    }
}

export default Card