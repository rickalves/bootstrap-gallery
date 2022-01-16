/*!
 * @file: loadIncludes.js
 * @author: Rick Alves;
 * @description: Script to append the pages fragments on specify containers;
 */
function loadIncludes(parent){
    if(!parent) parent = 'body'
      document.querySelectorAll(`${parent} [wm-include]`)
      . forEach(e => {
        const url = e.attributes['wm-include'].value

        fetch(url)
            .then(resp => {
                const nullElement = document.createElement('P').nodeValue
                if(!resp.ok) return nullElement
                if(resp.status === 404) return nullElement
                return resp.text()
            })
            .then(html => {
               e.innerHTML = html
               loadIncludes(e.nodeName)
            })
            .catch(err => console.log(err.message))
      })
}

loadIncludes()
