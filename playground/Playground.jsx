/* eslint-disable */
import React from 'react';
import shortid from 'shortid';
import './styles.css';
import { Container } from '@afconsult/apollo';
import CommentBox from '../src';

const randomDate = (start, end) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toJSON();
}

const Playground = () => {
  const comments = [
    {
      author: {
        displayName: 'Namn Namnsson',
        imageUrl: 'https://picsum.photos/200/200/?image=0',
      },
      createdDate: randomDate(new Date(2018, 1, 1), new Date()),
      id: shortid.generate(),
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dictum ipsum eu erat sagittis elementum. Morbi id leo commodo, facilisis nibh ullamcorper, efficitur tellus',
      actions: [
        { label: 'Edit', onClick: (commentId) => console.log(`Edited ${commentId}`) },
        { label: 'Delete', onClick: (commentId) => console.log(`Deleted ${commentId}`) }
      ],
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

  return (
    <Container>
      <CommentBox
        title="Comments"
        author={{
          displayName: 'Namn Namnsson',
          imageUrl: 'https://picsum.photos/200/200/?image=0',
          url: null,
        }}
        comments={
          comments.sort((a, b) =>
            (a.createdDate < b.createdDate ? -1 : 1))
        }
        placeholder="Write a comment..."
        onTranslate={commentId => {}}
        onSubmit={(plainText, html, json) => {}} /* NOTE: Return only text, return data object with all or just return the plaintext? */
        mention={{
          pattern: '/^[A-Za-z\sÅÄÖåäö]*$/',
          denotations: ['@', '#'],
          onChange: (searchTerm, renderList, denotation) => {}
        }}
      />
    </Container>
  );
};

export default Playground;
