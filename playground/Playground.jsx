/* eslint-disable */
import React from 'react';
import shortid from 'shortid';
import './styles.css';
import { Container } from '@afconsult/apollo';
import { CommentBox } from '../src';

export default function Playground() {
  const activeUser = {
    displayName: 'Jon Wahlström',
    imageUrl: 'https://static.feber.se/article_images/43/63/25/436325_1920.jpg'
  };

  const comments = [
    {
      author: {
        displayName: 'Namn Namnsson',
        imageUrl: 'https://static.feber.se/article_images/43/63/25/436325_1920.jpg',
      },
      createdDate: new Date().toString(),
      editable: false,
      id: shortid.generate(),
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dictum ipsum eu erat sagittis elementum. Morbi id leo commodo, facilisis nibh ullamcorper, efficitur tellus',
    },
    {
      author: {
        displayName: 'Namn Namnsson',
        imageUrl: 'https://static.feber.se/article_images/43/63/25/436325_1920.jpg',
      },
      createdDate: new Date().toString(),
      editable: false,
      id: shortid.generate(),
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. \nNunc dictum ipsum eu erat sagittis elementum. \n\nMorbi id leo commodo, facilisis nibh ullamcorper, efficitur tellus',
    },
    {
      author: {
        displayName: 'Namn Namnsson',
        imageUrl: 'https://static.feber.se/article_images/43/63/25/436325_1920.jpg',
      },
      createdDate: new Date().toString(),
      editable: false,
      id: shortid.generate(),
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. \n\nNunc dictum ipsum eu erat sagittis elementum. Morbi id leo commodo, facilisis nibh ullamcorper, efficitur tellus',
    }
  ];

  const styles = {
    height: '200px',
    width: '500px',
  };

  return (
    <Container>
      <CommentBox
        activeUser={activeUser}
        comments={comments}
        title={'Comments'}
      />
    </Container>
  );
}
