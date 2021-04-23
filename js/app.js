/* eslint-disable no-undef */
'use strict';
let keywordArr = [];
let objectsArray = [];

function Cartoon(contetnt) {
  this.title = contetnt.title;
  this.image_url = contetnt.image_url;
  this.description = contetnt.description;
  this.keyword = contetnt.keyword;
  this.horns = contetnt.horns;
  objectsArray.push(this);
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
    $('.keywordSelect').append(`<option value=${item}>${item}</option>`);
  });
  function makeObject(item) {
    let newObj = new Cartoon(item);
    newObj.renderObject();

  }
}


readJson();

console.log(objectsArray);

// make fillter #################################### below #####################################
$('.keywordSelect').on('change', makeFilter);
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
  keywordArr = [];

  $.ajax('data/page-2.json', ajaxSetting).then(getDataTwo);
}

function getDataTwo(data) {
  data.forEach(makeObjectTwo);
  keywordArr.forEach((item) => {
    $('.keywordSelect').append(`<option value=${item}>${item}</option>`);
  });
  function makeObjectTwo(item) {
    let newObj = new Cartoon(item);
    newObj.renderObject();
  }
}
// ############ pages #############
$('#pageOne').on('click', pageOne);
function pageOne() {
  objectsArray = [];
  $('.keywordSelect>option').remove();
  $('div').remove();
  readJson();

}

$('#pageTwo').on('click', pageTwo);
function pageTwo() {
  $('.keywordSelect>option').remove();
  $('div').remove();
  readJsonTwo();
}

// ######### sort ######################
console.log(objectsArray);

$('.sort').on('change', sortImage);
function sortImage() {
  $('div').hide();
  let sort = $('.sort').val();

  if (sort=== 'default') {
    $('div').show();
  }
  if (sort === 'title') {
    objectsArray.sort((a, b) => {
      let firstTitle = a.title;
      let nextTitle = b.title;
      if (firstTitle < nextTitle) {
        return -1;
      }
      if (firstTitle > nextTitle) {
        return 1;
      }
    });
    objectsArray.forEach(element => {
      element.renderObject();
    });
  }

  if(sort==='horns'){
    objectsArray.sort((a, b) => {
      let firstHorns = a.horns;
      let nextHorns = b.horns;
      if (firstHorns < nextHorns) {
        return -1;
      }
      if (firstHorns > nextHorns) {
        return 1;
      }
    });
    objectsArray.forEach(element => {
      element.renderObject();
    });
  }
}
