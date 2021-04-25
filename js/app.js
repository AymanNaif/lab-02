'use strict';
let keywordArr = [];
let objectsArr = [];
function Image(item) {
  this.title = item.title;
  this.imgUrl = item.image_url;
  this.description = item.description;
  this.horns = item.horns;
  this.keyword = item.keyword;
  objectsArr.push(this);
}

Image.prototype.renderObj = function () { // For make div and elements
  let template = $('#images').html();
  let renderObjects = Mustache.render(template,this);
  $('main').append(renderObjects);
};

function readJson() { // For read Json File and get the data
  const ajaxSett = {
    method: 'get',
    dataType: 'json'
  };
  $.ajax('data/page-1.json', ajaxSett).then(getData);
}

function getData(data) {
  data.forEach(element => { // For make new Objects and render it inside the page
    let newObject = new Image(element);
    newObject.renderObj();
    if (keywordArr.includes(newObject.keyword)===false) {
      keywordArr.push(newObject.keyword);
      $('.keywordSelect').append(`<option id="options" value="${newObject.keyword}">${newObject.keyword}</option>`);

    }
  });

}
readJson();

// ################ Make Filter ###################
$('.keywordSelect').on('change', makeFilter);
function makeFilter() {
  let option = $('.keywordSelect').val();
  $('div').hide();
  $(`.${option}`).show();
}

// ################ Lab 02 is Done ###################

// ################### Page Two ######################


function readJsonTwo() { // For read Json File and get the data
  const ajaxSett = {
    method: 'get',
    dataType: 'json'
  };
  $.ajax('data/page-2.json', ajaxSett).then(getDataTwo);
}

function getDataTwo(data) {
  data.forEach(element => { // For make new Objects and render it inside the page
    let newObject = new Image(element);
    newObject.renderObj();
    if (keywordArr.includes(newObject.keyword)===false) {
      keywordArr.push(newObject.keyword);
      $('.keywordSelect').append(`<option id="options" value="${newObject.keyword}">${newObject.keyword}</option>`);


    }
  });

}

$('#pageOne').on('click', pageOne);
function pageOne() {
  objectsArr = [];
  $('div').remove();
  $('.keywordSelect>option').remove();
  $('.keywordSelect').append('<option id="options" value="default">Filter by Keyword</option>');
  for (let i = 0; i < 11; i++) {
    $('.keywordSelect').append(`<option id="options" value="${keywordArr[i]}">${keywordArr[i]}</option>`);
  }


  readJson();
}
$('#pageTwo').on('click', pageTwo);
function pageTwo() {
  $('div').remove();
  $('.keywordSelect>option').remove();
  $('.keywordSelect').append('<option id="options" value="default">Filter by Keyword</option>');
  readJsonTwo();
}

// ############ Sort ###############

$('.sort').on('change', sortImages);
function sortImages() {
  let selctedValue = $('.sort').val();
  $('div').remove();
  $('div').hide();
  if (selctedValue === 'title') {
    objectsArr.sort((a, b) => {
      if (a.title < b.title) {
        return -1;
      }
      if (a.title > b.title) {
        return 11;
      } else {
        return 0;
      }
    }
    );
    objectsArr.forEach((element) => {
      element.renderObj();
    });
  }



  if (selctedValue === 'horns') {
    objectsArr.sort((a, b) => {
      return a.horns - b.horns;
    });
    objectsArr.forEach((element) => {
      element.renderObj();
    });

  }
}
