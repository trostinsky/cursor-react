import React, {Component} from 'react';
import MyButton from "./button";
const NEW_AVATAR = "https://scontent-frx5-1.xx.fbcdn.net/v/t1.0-1/p200x200/32696698_2074368559552629_1471027926672605184_n.jpg?_nc_cat=0&oh=779305855f4b215f87c987a3b5fa3bd1&oe=5C393880";
const OLD_AVATAR = "https://scontent-frx5-1.xx.fbcdn.net/v/t1.0-1/p160x160/20293039_1819179981726380_5425299224858583648_n.jpg?_nc_cat=0&oh=7a7c4a0b4c39bc143571cf6304a199f4&oe=5C19AFF0";

const store = {
    data: {
        image: OLD_AVATAR
    }, // не изменяемый(!!!)
    reducer(data, action){
        return data;
    },
    subscribers: [],
    dispatch(action){
        this.data = this.reducer(this.getData(), action);
        this.subscribers.forEach(
            (listener) => listener(this.getData())
        )
    },
    subscribe(callback){
        this.subscribers.push(callback);
        callback(this.getData());
    },
    getData(){
        return {...this.data}
    }
};

store.reducer = (data, action) => {
    if(action.type === "CHANGE_NAME"){
        return {
            ...data,
            name: action.name
        }
    }
    if(action.type === "CHANGE_IMAGE"){
        return {
            ...data,
            image: action.image
        }
    }
    return data;
};

const changePhotoHandler = (photo) => {
    store.dispatch({
        type: "CHANGE_IMAGE",
        image: photo
    })
}

const Settings = () => (
    <div>
        <button onClick={changePhotoHandler.bind(this, NEW_AVATAR)}>Change My Photo</button>
    </div>
)

const Header = ({avatar}) => (
    <div>
        <Settings />
        <p>Header:</p>
        <img src={avatar} alt=""/>
    </div>
);

const Comment = ({avatar}) => (
    <div>
        <p>Comment:</p>
        <img src={avatar} alt=""/>
    </div>
)

const Post = ({avatar}) => (
    <div>
        <Header avatar={avatar}/>
        <p>Post:</p>
        <img src={avatar} alt=""/>
        <Comment avatar={avatar}/>
    </div>
);

export default class App extends Component {
    componentWillMount(){
        store.subscribe((data) => {
            this.setState({
                image: data.image
            })
        })
    }

    componentWillUnmount(){
        // unsubscribe();
    }

    state = {
        image: null
    }

    render() {
        return (
            <div>
                <Post avatar={this.state.image}/>
            </div>
        );
    }
}
