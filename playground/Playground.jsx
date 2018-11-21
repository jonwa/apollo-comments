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
      id: 8653303542,
      displayName: 'Willow Mcdonald',
      imageUrl: 'https://picsum.photos/200/200/?image=0',
      onClick: (authorId) => { },
    };

    this.comments = [
      {
        id: 0,
        author: {
          id: 8653303542,
          displayName: 'Willow Mcdonald',
          imageUrl: 'https://picsum.photos/200/200/?image=0',
          onClick: (authorId) => { }
        },
        createdDate: new Date(2018, 1, 1, 9, 4, 59).toString(),
        text: 'Twee flannel poke knausgaard dreamcatcher normcore iPhone.',
        actions: [{ label: 'Delete', onClick: (commentId) => { } }],
      },
      {
        id: 1,
        author: {
          id: 9269792615,
          displayName: 'Cian Fernandez',
          imageUrl: 'https://picsum.photos/200/200/?image=1',
          onClick: (authorId) => { }
        },
        createdDate: new Date(2018, 1, 13, 13, 45, 12).toString(),
        text: 'Quinoa gluten-free single-origin coffee chambray.',
      },
    ];

    this.mention = {
      allowedChars: /^[A-Za-z\sÅÄÖåäö]*$/,
      denotationChars: ['@'],
      onSource: (searchTerm, renderList, denotationChar) => {
        const items = [
          { id: 5801740633, value: 'Annabelle Robinson' },
          { id: 9140877053, value: 'Brodie Stevenson' }
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
    };
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
