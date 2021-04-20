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



Cartoon.prototype.renderObject = function () {

  let template = $('#cartoon').html();
  let makeObj = Mustache.render(template,this);
  $('main').append(makeObj);

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

// ########## JSON 2#######################

function readJsonTwo() {
  const ajaxSetting = {
    method: 'get',
    dataType: 'json'
  };

  $.ajax('data/page-2.json', ajaxSetting).then(getDataTwo);
}

function getDataTwo(data) {
  data.forEach(makeObjectTwo);
  keywordArr.forEach((item) => {
    $('select').append(`<option value=${item}>${item}</option>`);
  });
  function makeObjectTwo(item) {
    let newObj = new Cartoon(item);
    newObj.renderObject();
  }
}
// ############ pages #############
$('#pageOne').on('click', pageOne);
function pageOne() {
  $('div').hide();
  readJson();

}

$('#pageTwo').on('click', pageTwo);
function pageTwo() {
  $('div').hide();
  readJsonTwo();

}

// TODO: make filter list for page1 and page 2
