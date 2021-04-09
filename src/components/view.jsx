//import React from 'react';
import maindata from './data.json';
import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import FormLabel from "@material-ui/core/FormLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import Paper from "@material-ui/core/Paper";

//let connection = new RTCMultiConnection();
const columns = [

  { field: 'name', headerName: 'Player Name', width: 120, sortable: false },
  {
    field: 'points',
    headerName: 'Points',
    type: 'number',
    width: 80,
  },
  {
    field: 'pointdifference',
    headerName: 'Point Difference',
    type: 'number',
    width: 150,
  },
];
const sortModel = [
  {
    field: 'pointdifference',
    sort: 'desc',
  },
];
let rows = maindata.matches[0].players;
//let maindata = JSON.parse(JSON.stringify(data));
class Landing extends React.Component {

  //let maindata = JSON.parse(JSON.stringify(data));
    constructor(props) {
      super(props);
      this.state = {
        match : 1,
      };
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
          if (maindata.matches[i].players[j].points != maindata.matches[i].players[j].winner)
            maindata.matches[i].players[j].pointdifference = t;
        }
        for(j = 0; j<maindata.matches[i].players.length;j++){
          if (maindata.matches[i].players[j].points == maindata.matches[i].players[j].winner){
            maindata.matches[i].players[j].pointdifference = v * -1;
            j = maindata.matches[i].players.length;
          }
        }
        console.log(maindata.matches[i].players);
      }
      rows = maindata.matches[0].players;
      this.setState({
        match : 1,
      });
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
            players[j].points += temp[j].points;
            players[j].pointdifference += temp[j].pointdifference;
          }
        }
        rows = players;
        this.setState({
          match : 0,
        });
      }
    }
    render() {
      return (
      <div>
      <Grid container className="root" spacing={2} style= {{placeContent: "center", marginTop: "30px"}}>
        <Grid item lg={11}>
          <Grid container justify="center" spacing={2}>
            <Grid item>
              <Paper className="papersmall">
              Matches<br/>
              <div className="growth">

                  {maindata.matches.map(match =>{
                      return(
                        this.state.match == match.match ?
                        (<ul> <Paper className="paperbtn" onClick={this.setMatch} style= {{background:"deepskyblue"}} data-match={match.match}>M{match.match}: {match.teams}</Paper> </ul> ) :
                        (<ul> <Paper className="paperbtn" onClick={this.setMatch} data-match={match.match}>M{match.match}: {match.teams}</Paper> </ul>)
                    )
                  })}
                  {this.state.match == 0 ?
                    (<ul> <Paper className="paperbtn" onClick={this.setMatch}style= {{background:"deepskyblue"}} data-match={0}>Overall</Paper> </ul>) :
                    (<ul> <Paper className="paperbtn" onClick={this.setMatch} data-match={0}>Overall</Paper> </ul>)
                  }
              </div>
              </Paper>

            </Grid>
            <Grid item>
              <Paper className="paper">
              <div style={{ height: 600, width: '100%' }}>
                  <DataGrid sortModel={sortModel} rows={rows} columns={columns} pageSize={17} disableColumnMenu />
              </div>
              </Paper>
            </Grid>

          </Grid>
        </Grid>
      </Grid>

      </div>
    );
  }
};

export default Landing;