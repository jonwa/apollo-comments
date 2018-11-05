/* eslint-disable */
import React from 'react';
import shortid from 'shortid';
import './styles.css';
import { Container } from '@afconsult/apollo';
import { CommentBox } from '../src';

export default function Playground() {
  const randomDate = (start, end) => {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toJSON();
  }
  
  const comments = [
    {
      author: {
        displayName: 'Namn Namnsson',
        imageUrl: 'https://picsum.photos/200/200/?image=0',
      },
      createdDate: randomDate(new Date(2018, 1, 1), new Date()),
      editable: true,
      id: shortid.generate(),
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dictum ipsum eu erat sagittis elementum. Morbi id leo commodo, facilisis nibh ullamcorper, efficitur tellus',
    },
    {
      author: {
        displayName: 'Namn Namnsson',
        imageUrl: 'https://picsum.photos/200/200/?image=1',
      },
      createdDate: randomDate(new Date(2018, 1, 1), new Date()),
      editable: false,
      id: shortid.generate(),
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. \nNunc dictum ipsum eu erat sagittis elementum. \n\nMorbi id leo commodo, facilisis nibh ullamcorper, efficitur tellus',
    },
    {
      author: {
        displayName: 'Namn Namnsson',
        imageUrl: 'https://picsum.photos/200/200/?image=10',
      },
      createdDate: randomDate(new Date(2018, 1, 1), new Date()),
      editable: false,
      id: shortid.generate(),
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. \n\nNunc dictum ipsum eu erat sagittis elementum. Morbi id leo commodo, facilisis nibh ullamcorper, efficitur tellus',
    }
  ];

  return (
    <Container>
      <CommentBox
        activeUser={{
          displayName: 'Namn Namnsson',
          imageUrl: 'https://picsum.photos/200/200/?image=0',
          url: '',
        }}
        comments={comments}
        onAddComment={() => console.log('Added a comment')}
        onDeleteComment={() => console.log('Deleted a comment')}
        onTranslateComment={() => console.log('Translated a comment')}
        placeholder="Write your comment here..."
        title="Comments"
      />
    </Container>
  );
}
