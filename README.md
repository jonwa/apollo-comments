# Apollo Comments
[![npm version](https://badge.fury.io/js/%40afconsult%2Fapollo-comments.svg)](https://badge.fury.io/js/%40afconsult%2Fapollo-comments)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
<br />
React Comments Plugin for ([Apollo](https://github.com/afconsult/apollo))

## Getting Started
### Install
Install with npm:
```bash
npm install @afconsult/apollo-comments --save
```
Install with [Yarn](https://yarnpkg.com/en/):
```bash
yarn add @afconsult/apollo-comments
```

### Example
1. import apollo-comments CSS in your ```src/index.js``` file:
```javscript
import '@afconsult/apollo/dist/css/apollo.css';
import '@afconsult/apollo/dist/css/apollo-comments.css';
```

2. Import required apollo-comments components in your ```src/index.js``` file or in any of your custom component files:
```javascript
import { CommentBox, CommentForm, CommentList, Comment } from '@afconsult/apollo-comments';
```

3. Tell React to render the components
```javascript
ReactDOM.render(
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
              onClick: id => console.log(`Delete ${id}`)
            }
          ]}
          translate={{
            label: 'Translate',
            onClick: id => console.log(`Translate ${id}`)
          }}
        />
      ))}
    </CommentList>
    <CommentForm
      onSubmit={text => console.log(`Submit ${text}`)}
      placeholder="Write a comment..."
      submitLabel="Post"
    />
  </CommentBox>,
  document.getElementById('app');
)
```

## Contribute
Feel free to [create an issue or feature request](https://github.com/afconsult/apollo-comments/issues/new).
At this point we're not accepting any pull requests.

## Authors
**Jon Wahlström** ([jonwa](https://github.com/jonwa))

See also the list of [contributors](https://github.com/afconsult/apollo-comments/contributors).

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

