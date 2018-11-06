/* eslint-disable */
import React from 'react';
import shortid from 'shortid';
import './styles.css';
import { Container } from '@afconsult/apollo';
import {
  CommentBox,
  CommentForm,
  CommentList,
  Comment
} from '../src';

export default function Playground() {
  const randomDate = (start, end) => {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toJSON();
  }
  
  const response = [
    {
      author: {
        displayName: 'Namn Namnsson',
        imageUrl: 'https://picsum.photos/200/200/?image=0',
      },
      createdDate: randomDate(new Date(2018, 1, 1), new Date()),
      id: shortid.generate(),
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dictum ipsum eu erat sagittis elementum. Morbi id leo commodo, facilisis nibh ullamcorper, efficitur tellus',
    },
    {
      author: {
        displayName: 'Namn Namnsson',
        imageUrl: 'https://picsum.photos/200/200/?image=1',
        url: null,
      },
      createdDate: randomDate(new Date(2018, 1, 1), new Date()),
      id: shortid.generate(),
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. \nNunc dictum ipsum eu erat sagittis elementum. \n\nMorbi id leo commodo, facilisis nibh ullamcorper, efficitur tellus',
    },
    {
      author: {
        displayName: 'Namn Namnsson',
        imageUrl: 'https://picsum.photos/200/200/?image=10',
        url: null,
      },
      createdDate: randomDate(new Date(2018, 1, 1), new Date()),
      id: shortid.generate(),
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. \n\nNunc dictum ipsum eu erat sagittis elementum. Morbi id leo commodo, facilisis nibh ullamcorper, efficitur tellus',
    }
  ];

  const comments = response.sort((lhs, rhs) => (
    (lhs.createdDate < rhs.createdDate ? -1 : 1)));
 
  return (
    <Container>
      <CommentBox
        title="Comments"
        author={{
          displayName: 'Namn Namnsson',
          imageUrl: 'https://picsum.photos/200/200/?image=0',
          url: null,
        }}
      >
        <CommentList>
          {comments.map(comment => (
            <Comment
              {...comment}
              key={comment.id}
              actions={[
                {
                  label: 'Delete',
                  onClick: (id) => console.log(`Delete ${id}`)
                }
              ]}
              translate={{
                label: 'Translate',
                onClick: (id) => console.log(`Translate ${id}`)
              }}
            />
          ))}
        </CommentList>
        <CommentForm
          onSubmit={text => console.log(`Submit ${text}`)}
          placeholder="Write a comment..."
          submitLabel="Post"
        />
      </CommentBox>
    </Container>
  );
}
