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
import '@afconsult/apollo/dist/css/apollo-comments.css';
```

2. Import required apollo-comments component in your ```src/index.js``` file or in any of your custom component files:
```javascript
import CommentBox from '@afconsult/apollo-comments';
```

3. Tell React to render the components
```javascript
ReactDOM.render(
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
    onTranslate={commentId => { }}
    onSubmit={editor => { }}
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
  />,
  document.getElementById('app');
)
```

### Props
`title`
: A string representing the comment box's title.

`placeholder`
: Specifying a short hint that describes the expected value of the input field.

`author`
: An object describing the user of the comment box. The object should specify a `displayName`, `imageUrl` and `url`.

`comments`
: An array of objects specifying comment data.  

| Comment    | Default        | Description  |
| ---------- | -------------- | ------------ |
| `id` | `undefined` | A unique string ID used to identify the comment. |
| `author` | `{}` | An object describing the author of the comment. The object should specify a `displayName`, `imageUrl` and `url`. |
| `createdDate` | `undefined` | A string representation of a date for when the comment was created. |
| `text` | `undefined` | |
| `actions` | `[]` | An array of objects specifying custom actions that can be applied to edit the comment. Each action requires a `label` and `onClick(commentId)`. |

`onTranslate(commentId)`
: Called back with the comment id that has been requested to translate. Default as `undefined`.

`onSubmit(editor)`
: Called back with the Quill editor after submit. For more informaton goto [React Quill](https://github.com/zenoamaro/react-quill/blob/master/README.md). Default is `undefined`.

`mention`
: An object specifying necessary [Quill Mention](https://github.com/afconsult/quill-mention) options. Default is `undefined`.

| Options    | Default        | Description |
| ---------- | -------------- | ------------ |
| `allowedChars` | `[A-Za-z\sÅÄÖåäö]` | Allowed characters in search term triggering a search request using regular expressions. |
| `denotationChars` | `['@']` | Specifies which characters will cause the quill mention autocomplete to open. |
| `onRenderItem(item, searchTerm)` | `null` | A function that gives you control over how matches from source are displayed. You can use this function to highlight the search term or change the design with custom HTML. |
| `onSource(searchTerm, renderList, denotationChar)` | `null` |  Required callback function to handle the search term and connect it to a data source for matches. The data source can be a local source or an AJAX request. The callback should call `renderList(matches, searchTerm);` with matches of JSON Objects in an array to show the result for the user. The JSON Objects should have `id` and `value` but can also have other values to be used in `renderItem` for custom display. |

## Contribute
Feel free to [create an issue or feature request](https://github.com/afconsult/apollo-comments/issues/new).
At this point we're not accepting any pull requests.

## Authors
**Jon Wahlström** ([jonwa](https://github.com/jonwa))

See also the list of [contributors](https://github.com/afconsult/apollo-comments/contributors).

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

