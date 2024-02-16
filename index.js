const path = require('path')

const { parser }  = require('posthtml-parser')

module.exports = ({ renderers = {}, root = './', encoding = 'utf-8', locals = {}} = {}) => {
  return tree => {
    tree.match({ tag: 'include' }, function (node) {
      const src = node.attrs.src
      const type = node.attrs.type

      if (!src || !(type in renderers)) {
        return node
      }

      const renderer = renderers[type]
      const absoluteSource = path.resolve(root, src)
      const parsedContent = renderer(absoluteSource, { encoding, locals, root})
      const content = parser(parsedContent)
        
      if (tree.messages) {
        tree.messages.push({
          type: 'dependency',
          file: src
        })
      }

      return {
        tag: false,
        content: content
      }
    })
    
    return tree
  }
}
