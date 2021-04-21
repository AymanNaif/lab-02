/* eslint-disable no-undef */
'use strict';
let keywordArr = [];
function Cartoon(contetnt) {
  this.title = contetnt.title;
  this.image_url = contetnt.image_url;
  this.description = contetnt.description;
  this.keyword = contetnt.keyword;
  this.horns = contetnt.horns;
}

Cartoon.prototype.render = function () {
  let objClone = $('.photo-template').clone();
  $('main').append(objClone);
  objClone.find('h2').text(this.title);
  objClone.find('img').attr('src',this.image_url);
  objClone.find('p').text(this.description);
  objClone.find('h5').text('its have '+this.horns+' horn');
  objClone.removeClass('.photo-template');
  objClone.attr('class', this.keyword);


  if (keywordArr.includes(this.keyword)=== false) {
    keywordArr.push(this.keyword);
  }

};


function readJson() {
  const ajaxSetting = {
    method: 'get',
    dataType: 'json'
  };

  $.ajax('data/page-1.json', ajaxSetting).then(getData);
}

function getData(data) {
  data.forEach(makeObject);
  keywordArr.forEach((item) => {
    $('select').append(`<option value=${item}>${item}</option>`);
  });
  function makeObject(item) {
    let newObj = new Cartoon(item);
    newObj.renderObject();
  }
}


readJson();


// make fillter #################################### below #####################################
$('select').on('change', makeFilter);
function makeFilter() {
  let select = $(this).val();
  $('div').hide();
  $(`.${select}`).show();
}
