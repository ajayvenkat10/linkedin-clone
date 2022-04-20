import React, { useEffect, useState } from 'react';
import './Feed.css';
import CreateIcon from '@material-ui/icons/Create';
import InputOption from './InputOption';
import ImageIcon from '@material-ui/icons/Image';
import SubscriptionsIcon from '@material-ui/icons/Subscriptions';
import EventNoteIcon from '@material-ui/icons/EventNote';
import CalendarViewDayIcon from '@material-ui/icons/CalendarViewDay';
import Post from './Post';
import { db } from './Firebase';
import { collection, getDocs, serverTimestamp, addDoc, orderBy, query } from 'firebase/firestore/lite';
import { useSelector } from 'react-redux';
import { selectUser } from './features/userSlice';
import FlipMove from 'react-flip-move';

function Feed() {

  const user = useSelector(selectUser);

  const [input, setInput] = useState('');
  const [posts, setPosts] = useState([]);

  useEffect(() => {

    async function fetchData() {
      const collections = query(collection(db, 'posts'), orderBy('timestamp', 'desc'));
      const dbSnapshot = await getDocs(collections);
      setPosts(dbSnapshot.docs.map((doc) => (
        {
          id: doc.id,
          data: doc.data(),
        }
      )));
    }

    fetchData();
  },);

  const sendPost = async (event) => {
    event.preventDefault();

    await addDoc(collection(db, 'posts'), {
      name: user.displayName,
      description: user.email,
      message: input,
      photoUrl: user.photoUrl || '',
      timestamp: serverTimestamp(),
    });

    setInput('');
  }

  return (
    <div className='feed'>
      <div className="feed__inputContainer">
        <div className="feed__input">
          <CreateIcon />
          <form action="">
            <input type="text" placeholder="What's on your mind?" value={input} onChange={e => setInput(e.target.value)} />
            <button onClick={sendPost} type='submit'>Send</button>
          </form>
        </div>
        <div className="feed__inputOptions">
          <InputOption Icon={ImageIcon} title='Photo' color="#70B5F9" />
          <InputOption Icon={SubscriptionsIcon} title='Video' color="#E7A33E" />
          <InputOption Icon={EventNoteIcon} title='Event' color="#C0CBCD" />
          <InputOption Icon={CalendarViewDayIcon} title='Write an article' color="#7FC15E" />
        </div>
      </div>

      {/* Posts */}
      <FlipMove>
      {posts.map(({ id, data: { name, description, message, photoUrl } }) => (
        <Post
          key={id}
          name={name}
          description={description}
          message={message}
          photoUrl={photoUrl}
        />
      ))}
      </FlipMove>
    </div>
  )
}

export default Feed