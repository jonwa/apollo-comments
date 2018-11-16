/* eslint-disable */
import './styles.css';
import React from 'react';
import shortid from 'shortid';
import { Container } from '@afconsult/apollo';
import CommentBox from '../src';

class Playground extends React.Component {
  constructor(props) {
    super(props);

    this.author = {
      id: '77bfcd2a-b243-435d-8666-784ab4fa87fd',
      displayName: 'Willow Mcdonald',
      imageUrl: 'https://picsum.photos/200/200/?image=0',
      onClick: (authorId) => { console.log(authorId); },
    };

    this.comments = [
      {
        id: shortid.generate(),
        author: {
          displayName: 'Willow Mcdonald',
          id: '77bfcd2a-b243-435d-8666-784ab4fa87fd',
          imageUrl: 'https://picsum.photos/200/200/?image=0',
          onClick: (authorId) => { console.log(authorId) }
        },
        createdDate: new Date(2018, 1, 1).toJSON(),
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dictum ipsum eu erat sagittis elementum...',
        actions: [{ label: 'Delete', onClick: (commentId) => console.log(`Deleted ${commentId}`) }],
      },
      {
        id: shortid.generate(),
        author: {
          displayName: 'Cian Fernandez',
          id: '0ea33d62-db04-4923-8bea-170bd99cb65f',
          imageUrl: 'https://picsum.photos/200/200/?image=1',
          onClick: (authorId) => { console.log(authorId) }
        },
        createdDate: new Date(2018, 1, 13).toJSON(),
        text: '<b>Lorem</b> ipsum dolor sit amet, consectetur adipiscing elit. \nNunc dictum ipsum eu erat sagittis elementum...',
      },
    ];

    this.mention = {
      allowedChars: /^[A-Za-z\sÅÄÖåäö]*$/,
      denotationChars: ['@'],
      onSource: (searchTerm, renderList, denotationChar) => {
        const items = [
          { id: 'ee2aec62-5a1b-46b3-a093-c6ce2ef244dd', value: 'Annabelle Robinson' },
          { id: 'c4f3548c-0090-4bae-8536-cc320d8035bf', value: 'Brodie Stevenson' }
        ];

        if (searchTerm.length === 0) {
          renderList(items, searchTerm);
        } else {
          const matches = [];
          for (i = 0; i < items.length; i++) {
            if (~items[i].value.toLowerCase().indexOf(searchTerm.toLowerCase())) {
              matches.push(items[i]);
            }
          }
          renderList(matches, searchTerm);
        }
      }
    }
  }

  render() {
    return (
      <Container>
        <CommentBox
          author={this.author}
          comments={this.comments.sort((a, b) => a.createdDate < b.createdDate ? -1 : 1)}
          mention={this.mention}
          onSubmit={editor => { }}
          placeholder="Write a comment..."
          title="Comments"
        />
      </Container>
    );
  }
}

export default Playground;
