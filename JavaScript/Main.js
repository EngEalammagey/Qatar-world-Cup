
const token="cb47ed1359824aa380f1901accd5edbb";
const baseUrl="https://api.football-data.org/v4/competitions/2000";

function getStandings() {
    const url=`${baseUrl}/standings`
    axios.get(url,{
        headers:{
            "X-Auth-Token":token
        }
    })
    .then((response)=>{


        const standings=response.data.standings;
        for (standing of standings) {
            let tableContent="";
            for (row of standing.table){
               tableContent+=`
               <li class="list-group-item">
                        <div class="row ">
                            <div class="col-sm-4 d-flex justify-content-center align-items-center">
                                <div class="flag">
                                    <img class="rounded-circle" style="width: 40px;height: 40px; object-fit:cover; " src="${row.team.crest}" alt="spainFlag">
                                </div>
                                <h5 class="flag-title border-2"><b>${row.team.tla} </b> </h5>
                            </div>
                            <div class="col-sm-2">
                                <div class="text-center">
                                    ${row.won}
                                </div>
                            </div>
                            <div class="col-sm-2">
                                <div class="text-center">
                                    ${row.lost}
                                </div>
                            </div>
                            <div class="col-sm-2">
                                <div class="text-center">
                                    ${row.draw}
                                </div>
                            </div>
                            <div class="col-sm-2">
                                <div class="text-center">
                                    <b>${row.points} </b> 
                                </div>
                            </div>
                        </div>
                      </li>
               
               ` 
            }
            const content=`
            <div class="col-sm-6 mb-4">
                <div class="card shadow border-0" >
                    <div class="card-header main-color text-center">
                      <b>${standing.group}</b> 
                    </div>
                    <div class="row m-0 seconed-color">
                        <div class="col-sm-4">
                            <div class="text-center">
                                Team
                            </div>
                        </div>
                        <div class="col-sm-2">
                            <div class="text-center">
                                W
                            </div>
                        </div>
                        <div class="col-sm-2">
                            <div class="text-center">
                                L
                            </div>
                        </div>
                        <div class="col-sm-2">
                            <div class="text-center">
                                D
                            </div>
                        </div>
                        <div class="col-sm-2">
                            <div class="text-center">
                                Pnts
                            </div>
                        </div>
                    </div>
                    <ul class="list-group list-group-flush">

                    <!-- teams -->
                        ${tableContent}

                    <!-- teams -->
                    </ul>
                </div>
            </div>

            `

            document.getElementById("standing").innerHTML+=content
        }

        console.log(standings);
    })
}
function getMatches() {
    const url=`${baseUrl}/matches`
    axios.get(url,{
        headers:{
            "X-Auth-Token":token
        }
    })
    .then((response)=>{
        console.log(response.data);
        const matches=response.data.matches;
        for (const match of matches) {
            const homeTeam=match.homeTeam;
            const awayTeam=match.awayTeam;
            const utcDate=match.utcDate;
            const matchTime=new Date(utcDate);
            const dayString=matchTime.getFullYear()+" / "+(matchTime.getMonth()+1)+" / "+(matchTime.getDay()+1) ;
            const datestring=(matchTime.getHours())+" : "+(matchTime.getMinutes());
            if (homeTeam.name ==null) {
                continue
            }
            let content=`
            <div class="col-sm-12 gy-5 d-flex flex-column justify-content-center ">
                    <div class="card shadow rounded-pill overflow-hidden">
                        <div class="card-body p-0">
                            <div class="row" >
                                <!-- first teams col -->      
                                <div class="team-col col-sm-3 main-color d-flex flex-column justify-content-center align-items-center"style="text-align: center; margin: auto 0 ; height: 120px;" >
                                    <div >
                                        <div class="flag">
                                            <img class="rounded-circle" style="width: 40px;height: 40px; object-fit:cover; " src="${homeTeam.crest}" alt="spainFlag">
                                        </div>
                                        <h5 class="flag-title border-2"><b>${homeTeam.tla} </b> </h5>
                                    </div>

                                </div>
                                <!-- // first teams col // -->

                                <!-- match inf col -->

                                <div class="col-sm-6 text-center">
                                    <div class="row">
                                        <div class="col-sm-4" style="margin: auto 0;">
                                            <h3> ${match.score.fullTime.home ??" - "}</h3>
                                        </div>
                                        <div class="col-sm-4" style="margin: auto 0;">
                                            <h6>${match.group??""}</h6>
                                            <h1>X</h1>
                                            <h6>${dayString}<br/>${datestring}</h6>
                                        </div>
                                        <div class="col-sm-4" style="margin: auto 0;">
                                            <h3>${match.score.fullTime.away ??" - "} </h3>
                                        </div>
                                    </div>                               
                                </div>
                                <!-- //match inf col// -->
                                <!-- sec teem col -->
                                <div class="sec-team-col col-sm-3 main-color d-flex flex-column justify-content-center align-items-center"style="text-align: center; margin: auto 0 ; height: 120px;" >
                                    <div >
                                        <div class="flag">
                                            <img class="rounded-circle" style="width: 40px;height: 40px; object-fit:cover; " src="${awayTeam.crest}" alt="spainFlag">
                                        </div>
                                        <h5 class="flag-title border-2"><b>${awayTeam.tla} </b> </h5>
                                    </div>

                                </div>
                                <!-- //sec teem col// -->

                            </div>
                        </div>
                    </div>
                </div>
            `
            document.getElementById("matches").innerHTML+=content;
        }

    })

    
}


getStandings()
getMatches()
