/* eslint-disable */
import './styles.css';
import React from 'react';
import shortid from 'shortid';
import { Container } from '@afconsult/apollo';
import CommentBox from '../src';

class Playground extends React.Component {
  constructor(props) {
    super(props);
    this.randomDate = this.randomDate.bind(this);
    this.handleMentionChange = this.handleMentionChange.bind(this);
  }

  randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toJSON();
  }

  handleMentionChange(searchTerm, renderList, denotation) {
    console.log(searchTerm)
    const atValues = [
      { id: 1, value: 'Fredrik Sundqvist' },
      { id: 2, value: 'Patrik Sjölin' }
    ];

    let values;

    if (denotation === "@") {
      values = atValues;
    }

    if (searchTerm.length === 0) {
      renderList(values, searchTerm);
    } else {
      const matches = [];
      for (i = 0; i < values.length; i++)
        if (~values[i].value.toLowerCase().indexOf(searchTerm.toLowerCase())) matches.push(values[i]);
      renderList(matches, searchTerm);
    }
  }

  render() {
    const comments = [
      {
        id: shortid.generate(),
        author: { displayName: 'Namn Namnsson 1', imageUrl: 'https://picsum.photos/200/200/?image=0', },
        createdDate: this.randomDate(new Date(2018, 1, 1), new Date()),
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dictum ipsum eu erat sagittis elementum. Morbi id leo commodo, facilisis nibh ullamcorper, efficitur tellus',
        actions: [{ label: 'Delete', onClick: (commentId) => console.log(`Deleted ${commentId}`) }],
      },
      {
        id: shortid.generate(),
        author: { displayName: 'Namn Namnsson 3', imageUrl: 'https://picsum.photos/200/200/?image=1', url: null, },
        createdDate: this.randomDate(new Date(2018, 1, 1), new Date()),
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. \nNunc dictum ipsum eu erat sagittis elementum. \n\nMorbi id leo commodo, facilisis nibh ullamcorper, efficitur tellus',
      },
      {
        id: shortid.generate(),
        author: { displayName: 'Namn Namnsson 3', imageUrl: 'https://picsum.photos/200/200/?image=10', url: null, },
        createdDate: this.randomDate(new Date(2018, 1, 1), new Date()),
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. \n\nNunc dictum ipsum eu erat sagittis elementum. Morbi id leo commodo, facilisis nibh ullamcorper, efficitur tellus',
      }
    ];

    return (
      <Container>
        <CommentBox
          title="Comments"
          placeholder="Write a comment..."
          author={{
            displayName: 'Namn Namnsson',
            imageUrl: 'https://picsum.photos/200/200/?image=0',
            url: null,
          }}
          comments={
            comments.sort((a, b) =>
              (a.createdDate < b.createdDate ? -1 : 1))
          }
          onTranslate={commentId => {}}
          onSubmit={editor => {}}
          mention={{
            allowedChars: /^[A-Za-z\sÅÄÖåäö]*$/,
            denotationChars: ['@'],
            onRenderItem: (item, searchTerm) => {
              return `${item.value}`;
            },
            onSource: (searchTerm, renderList, denotationChar) => {
              const values = [
                { id: 1, value: 'Fredrik Sundqvist' },
                { id: 2, value: 'Patrik Sjölin' }
              ];

              if (searchTerm.length === 0) {
                renderList(values, searchTerm);
              } else {
                const matches = [];
                for (i = 0; i < values.length; i++) {
                  if (~values[i].value.toLowerCase().indexOf(searchTerm.toLowerCase())) {
                    matches.push(values[i]);
                  }
                }
                renderList(matches, searchTerm);
              }
            }
          }}
        />
      </Container>
    );
  }
}

export default Playground;
