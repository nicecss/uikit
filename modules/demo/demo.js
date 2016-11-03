var html5Element = [
  'section',
  'article',
  'tip'
];

export default function(){
  for(var i = 0;i<html5Element.length;i++){
    document.createElement(html5Element[i])
  }
}