//import React from 'react';
import maindata from './data.json';
import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
//let connection = new RTCMultiConnection();
const columns = [
  { field: 'name', headerName: 'Player', width: 93, sortable: false },
  {
    field: 'points',
    headerName: 'Points',
    type: 'number',
    width: 90,
  },
  {
    field: 'pointdifference',
    headerName: 'Net Diff',
    type: 'number',
    width: 110,
  },
  {
    field: 'winloss',
    headerName: 'Win/Loss',
    type: 'number',
    width: 120,
  },
];
const columns2 = [

  { field: 'name', headerName: 'Player', width: 93, sortable: false },
  {
    field: 'points',
    headerName: 'Points',
    type: 'number',
    width: 90,
  },
  {
    field: 'pointdifference',
    headerName: 'Net Diff',
    type: 'number',
    width: 110,
  },
  {
    field: 'winloss',
    headerName: 'Win/Loss',
    type: 'number',
    width: 120,
  },
  {
    field: 'avg',
    headerName: 'Avg Pts',
    type: 'number',
    width: 110,
  },
];

const sortModel = [
  {
    field: 'winloss',
    sort: 'desc',
  },
];
let rows = maindata.matches[0].players;
function Copyright() {
return (
  <Typography variant="body2" color="error" align="center">
    {'Last Updated : 16/04/2021, 05:50 PM '}
  </Typography>
);
}
//let maindata = JSON.parse(JSON.stringify(data));
class Landing extends React.Component {



  //let maindata = JSON.parse(JSON.stringify(data));
    constructor(props) {
      super(props);
      this.state = {
        match : 0,
      };
      this.myRef = React.createRef();
    }
    componentDidMount(){
      let i = 0;
      let j = 0;
      //Adding winner point difference field
      for(i = 0;i<maindata.matches.length; i++){
        let v = 0;
        for(j = 0; j<maindata.matches[i].players.length;j++){
          let t = 0;
          t = maindata.matches[i].players[j].points - maindata.matches[i].players[j].winner;
          v += t;
          if (maindata.matches[i].players[j].points !== maindata.matches[i].players[j].winner)
            maindata.matches[i].players[j].pointdifference = parseInt(t);
        }
        for(j = 0; j<maindata.matches[i].players.length;j++){
          if (maindata.matches[i].players[j].points === maindata.matches[i].players[j].winner){
            maindata.matches[i].players[j].pointdifference = parseInt(v * -1);
            j = maindata.matches[i].players.length;
          }
        }
        console.log(maindata.matches[i].players);
      }
      //rows = maindata.matches[0].players;
      let players = JSON.parse(JSON.stringify(maindata.matches[0].players));
      for(let i = 1 ;i < maindata.matches.length;i++){
        let temp = maindata.matches[i].players;
        for(let j= 0; j<players.length; j++){
          players[j].points += temp[j].points;
          if(players[j].pointdifference == null)
            players[j].pointdifference = 0;
          players[j].pointdifference += temp[j].pointdifference;
          console.log(players[j].pointdifference +" "+temp[j].pointdifference);
          players[j].winloss += temp[j].winloss;
          players[j].played = players[j].played + 1;
          console.log(maindata.matches.length-1);
          if (i === maindata.matches.length-1)
            players[j].avg = parseInt(players[j].points / players[j].played);
        }
      }
      rows = players;
      this.setState({
        match : 0,
      });
      this.executeScroll();
    }
    setMatch = (event) =>{
      if(event.currentTarget.dataset.match > 0){
        rows = maindata.matches[event.currentTarget.dataset.match-1].players;
        console.log(rows);
        this.setState({
          match : event.currentTarget.dataset.match,
        });
      }
      else{
        let players = JSON.parse(JSON.stringify(maindata.matches[0].players));
        for(let i = 1 ;i < maindata.matches.length;i++){
          let temp = maindata.matches[i].players;
          for(let j= 0; j<players.length; j++){
            console.log(players[j]);
            players[j].points += temp[j].points;
            if(players[j].pointdifference == null)
              players[j].pointdifference = 0;
            players[j].pointdifference += temp[j].pointdifference;
            players[j].winloss += temp[j].winloss;
            players[j].played = players[j].played + 1;
            if (i === maindata.matches.length-1)
              players[j].avg = parseInt(players[j].points / players[j].played);
          }
        }
        rows = players;
        this.setState({
          match : 0,
        });
      }
    }
    executeScroll = () => this.myRef.current.scrollIntoView();
    render() {
      return (
      <div>
      <div className="header">
        Desai<br/>
        <img width="370px" alt="Dream11" className="img" src="https://ttensports.com/wp-content/uploads/2019/10/Dream-11.png"/>
      </div>
      <Grid container className="root" spacing={2} style= {{placeContent: "center", marginTop: "5px"}}>
        <Grid item lg={11}>
          <Grid container justify="center" spacing={2}>
            <Grid item>
              <Paper className="papersmall">
              <div style={{height:"0.5px"}}></div>
              <h3> Matches </h3>
              <div className="growth">

                  {maindata.matches.map(match =>{
                      return(
                        parseInt(this.state.match) === match.match ?
                        (<ul> <Paper className="paperbtn" onClick={this.setMatch} style= {{background: "#e02228", color: "white"}} data-match={match.match}>M{match.match}: {match.teams}</Paper> </ul> ) :
                        (<ul> <Paper className="paperbtn" onClick={this.setMatch} data-match={match.match}>M{match.match}: {match.teams}</Paper> </ul>)
                    )
                  })}
                  {this.state.match === 0 ?
                    (<ul> <Paper className="paperbtn" onClick={this.setMatch}style= {{background: "#e02228", color: "white"}} data-match={0}>Overall</Paper> </ul>) :
                    (<ul> <Paper className="paperbtn" onClick={this.setMatch} data-match={0}>Overall</Paper> </ul>)
                  }
                  <div ref = {this.myRef}/>
              </div>
              </Paper>

            </Grid>
            <Grid item>
              <Paper className="paper">
              <div className = "mygrid">
                {
                  this.state.match === 0 ?
                  <DataGrid sortModel={sortModel} rows={rows} columns={columns2} pageSize={17} disableColumnMenu /> :
                  <DataGrid sortModel={sortModel} rows={rows} columns={columns} pageSize={17} disableColumnMenu />
                }

              </div>
              </Paper>
            </Grid>

          </Grid>
        </Grid>
      </Grid>
      <Box mt={5}>
							<Copyright />
						</Box>
      </div>
    );
  }
};

export default Landing;
