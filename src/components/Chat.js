import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import { green, pink } from '@material-ui/core/colors'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Chip from '@material-ui/core/Chip';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { changeTextValue, CTX  } from '../contexts/Store';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  avatarOne: {
    color: '#fff',
    backgroundColor: pink[500],
  },
  avatarTwo: {
    color: '#fff',
    backgroundColor: green[500],
  },
  messageRight: {
    textAlign: 'right',
    color: 'red',
    marginRight: "auto",
  },
  chatBox: {
    width: '85%',
  },
  button: {
    width: '15%'
  },
  toolbarButtons: {
    marginLeft: "auto",
    marginRight: -12
  },
  box: {
    marginBottom: 40,
    height: 'calc(100% - 100px)',
  },
  card: {
    display: "flex",
    maxWidth: 800,
  },
  CardContent: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between"
  }
}));

export default function AlignItemsList() {
  
  const classes = useStyles();
  const { allChats, sendChatAction, user } = React.useContext(CTX);
  const topics = Object.keys(allChats)
  const [textValue, changeTextValue] = useState('');
  const [listMessages, setListMessages] = useState('');
  

  return (
    <Card className={classes.card}>
      <CardContent className={classes.CardContent}>
        <List className={classes.root}>
          {
            allChats['general'].map((chat , i )=> (
              <div className={classes.flex} key={i}>
                <MessageLeft message={chat.msg}/>
              </div>
            ))
          }
          {/* <MessageRight/> */}
        </List>

        <div style={{display: 'flex', justifyContent: 'flex-end'}}>
          <TextField
          label="Send a chat"
          value={textValue}
          onChange={(e) => changeTextValue(e.target.value)}
          className={classes.chatBox}
        />
        <Button 
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={() => {
          sendChatAction({from:user, msg: textValue, topic: 'general'});
          changeTextValue('');
        }}
        >
          Send
        </Button>
        </div>
      </CardContent>
    </Card>
  );
}


const  MessageLeft =  (prop) => {
  const classes = useStyles();
  return (
    <div>
      <ListItem  style={{display: 'flex', justifyContent: 'flex-start'}}>
        <ListItemAvatar style={{minWidth: 40}}>
            <Avatar className={classes.avatarOne}>
              <AccountCircle />
            </Avatar>
        </ListItemAvatar>
          <Chip label={ prop.message }/>
        </ListItem>
    </div>
  )
}

const  MessageRight =  (prop) => {
  const classes = useStyles();
  return (
    <div>
      <ListItem  style={{display: 'flex', justifyContent: 'flex-end'}}>
        <Chip label={ prop.message }/>
        <ListItemAvatar style={{minWidth: 40}}>
          <Avatar className={classes.avatarTwo}>
            <AccountCircle />
          </Avatar>
      </ListItemAvatar>
      </ListItem>
    </div>
  )
}
