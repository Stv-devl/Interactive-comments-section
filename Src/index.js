//Variables
const reply = document.querySelectorAll(".comment_reply");
const replyContainer = document.querySelectorAll(".replycontainer");
const answerContainer = document.querySelectorAll(".answer_container");
let idNumber = 5;

//local storage
const LocalStorageList = "jsonStorage";
let storageData = JSON.parse(localStorage.getItem(LocalStorageList)) || [];

console.log(storageData);
// getData from Json files
const getData = async () => {
  const response = await fetch(`data.json`);
  const data = await response.json();
  if (localStorage.length == 0)
    return localStorage.setItem(LocalStorageList, JSON.stringify(data));
  else return writeData();
};

//data from json
function writeData() {
  //amy
  amyAvatar.style.backgroundImage = `url(${storageData.comments[0].user.image.png})`;
  commentAmy.textContent = storageData.comments[0].content;
  amyDate.textContent = storageData.comments[0].createdAt;
  amyID.textContent = storageData.comments[0].user.username;
  amyScore.textContent = storageData.comments[0].score;
  //amy for media
  amyCommentMediaNbr.textContent = storageData.comments[0].score;
  //max
  maxAvatar.style.backgroundImage = `url(${storageData.comments[1].user.image.png})`;
  maxComment.textContent = storageData.comments[1].content;
  maxDate.textContent = storageData.comments[1].createdAt;
  maxId.textContent = storageData.comments[1].user.username;
  maxScore.textContent = storageData.comments[1].score;
  //max for media
  maxCommentMediaNbr.textContent = storageData.comments[1].score;
  //ram
  ramAvatar.style.backgroundImage = `url(${storageData.comments[1].replies[0].user.image.png})`;
  ramComment.innerHTML = `<p><span>@${storageData.comments[1].replies[0].replyingTo}</span> ${storageData.comments[1].replies[0].content}</p>`;
  ramDate.textContent = storageData.comments[1].replies[0].createdAt;
  ramId.textContent = storageData.comments[1].replies[0].user.username;
  ramScore.textContent = storageData.comments[1].replies[0].score;
  //ram for media
  ramCommentMediaNbr.textContent = storageData.comments[1].replies[0].score;
  //jul (you)
  julAvatar.style.backgroundImage = `url(${storageData.comments[1].replies[1].user.image.png})`;
  julComment.innerHTML = `<p><span>@${storageData.comments[1].replies[1].replyingTo}</span> ${storageData.comments[1].replies[0].content}</p>`;
  julDate.textContent = storageData.comments[1].replies[1].createdAt;
  julId.textContent = storageData.comments[1].replies[1].user.username;
  julScore.textContent = storageData.comments[1].replies[1].score;
  //jul (you) for media
  julCommentMediaNbr.textContent = storageData.comments[1].replies[1].score;
  //jul for
}

//displayReply
function displayReply(displayAnswer, displayId) {
  displayAnswer.innerHTML = `<div class="send_container">
  <img class="juliusomo_avatar_answer" src="./Src/images/avatars/image-juliusomo.png"
    alt="juliusomo_picture_profile">
  <form>
    <div class="input-wrapper">
      <textarea type="text" class="comment-input">@${displayId}</textarea>
    </div>
  </form>
  <button class="btn" type="button">reply</button>
</div>`;
  displayAnswer.classList.toggle("activate");

  const btn = document.querySelectorAll(".btn");

  //when click on reply
  btn.forEach((element) => {
    element.addEventListener("click", () => {
      const inputData =
        element.parentElement.children[1].children[0].children[0].value;
      const answerData =
        element.parentElement.parentElement.parentElement.children[2];
      answerData.classList.add("active");
      displayAnswer.classList.remove("activate");

      let getId = element.parentElement.parentElement.id;
      console.log(getId);

      writeReply(inputData, getId);
    });
  });
}

//function addReplyData
function addContent01(inputData) {
  return {
    id: idNumber++,
    content: `@amyrobson ${inputData}`,
    createdAt: "Today",
    score: 0,
    replyingTo: "amyrobson",
    user: {
      image: {
        png: "./images/avatars/image-juliusomo.png",
        webp: "./images/avatars/image-juliusomo.webp",
      },
      username: "juliusomo",
    },
  };
}

function addContent02(inputData) {
  return {
    id: idNumber++,
    content: `@maxblagun ${inputData}`,
    createdAt: "today",
    score: 0,
    replyingTo: "maxblagun",
    user: {
      image: {
        png: "./images/avatars/image-juliusomo.png",
        webp: "./images/avatars/image-juliusomo.webp",
      },
      username: "juliusomo",
    },
  };
}

function addContent03(inputData) {
  return {
    id: idNumber++,
    content: `@ramsesmiron ${inputData}`,
    createdAt: "today",
    score: 0,
    replyingTo: "ramsesmiron",
    user: {
      image: {
        png: "./images/avatars/image-juliusomo.png",
        webp: "./images/avatars/image-juliusomo.webp",
      },
      username: "juliusomo",
    },
  };
}

function writeReply(inputData, getId) {
  switch (getId) {
    case (getId = "reply01"):
      storageData.comments[0].replies.push(addContent01(inputData));
      saveToLocalstorage();
      break;
    case (getId = "reply02"):
      storageData.comments[1].replies.push(addContent02(inputData));
      saveToLocalstorage();
      break;
    case (getId = "reply03"):
      storageData.comments[1].replies.push(addContent03(inputData));
      saveToLocalstorage();
      break;
  }
}

//html
function answerHtml() {
  `<div class="answer">
  <div class="comment_wrapper">
    <div class="comment">
      <div class="counter_wrapper">
        <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" class="comment_plus">
          <path
            d="M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z"
            fill="#C5C6EF" /></svg>
        <div class="comment_number" id="julScore"></div>
        <svg xmlns="http://www.w3.org/2000/svg" width="11" height="3" class="comment_minus">
          <path
            d="M9.256 2.66c.204 0 .38-.056.53-.167.148-.11.222-.243.222-.396V.722c0-.152-.074-.284-.223-.395a.859.859 0 0 0-.53-.167H.76a.859.859 0 0 0-.53.167C.083.437.009.57.009.722v1.375c0 .153.074.285.223.396a.859.859 0 0 0 .53.167h8.495Z"
            fill="#C5C6EF" /></svg>
      </div>
      <div class="comment_body">
        <div class="comment_header">
          <div class="comment_profile">
            <span id="julAvatar"></span>
            <p class="profile_id" id="julId"></p>
            <p class="you">you</p>
            <p id="julDate"></p>
          </div>
          <div class="modification_wrapper">
            <div class="comment_delete">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="14" class="delete">
                <path
                  d="M1.167 12.448c0 .854.7 1.552 1.555 1.552h6.222c.856 0 1.556-.698 1.556-1.552V3.5H1.167v8.948Zm10.5-11.281H8.75L7.773 0h-3.88l-.976 1.167H0v1.166h11.667V1.167Z"
                  fill="#ED6368" /></svg>
              <p class="text_delete">Delete</p>
            </div>
            <div class="comment_edit">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" class="edit">
                <path
                  d="M13.479 2.872 11.08.474a1.75 1.75 0 0 0-2.327-.06L.879 8.287a1.75 1.75 0 0 0-.5 1.06l-.375 3.648a.875.875 0 0 0 .875.954h.078l3.65-.333c.399-.04.773-.216 1.058-.499l7.875-7.875a1.68 1.68 0 0 0-.061-2.371Zm-2.975 2.923L8.159 3.449 9.865 1.7l2.389 2.39-1.75 1.706Z"
                  fill="#5357B6" /></svg>
              <p class="text_edit">Edit</p>
            </div>
          </div>
        </div>
        <div id="julComment"></div>
      </div>
      <!-- answer 2 for media -->
      <div class="comment_footer">
        <div class="counter_wrapper">
          <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" class="comment_plus">
            <path
              d="M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z"
              fill="#C5C6EF" /></svg>
          <div class="comment_number" id="julCommentMediaNbr"></div>
          <svg xmlns="http://www.w3.org/2000/svg" width="11" height="3" class="comment_minus">
            <path
              d="M9.256 2.66c.204 0 .38-.056.53-.167.148-.11.222-.243.222-.396V.722c0-.152-.074-.284-.223-.395a.859.859 0 0 0-.53-.167H.76a.859.859 0 0 0-.53.167C.083.437.009.57.009.722v1.375c0 .153.074.285.223.396a.859.859 0 0 0 .53.167h8.495Z"
              fill="#C5C6EF" /></svg>
        </div>
        <div class="modification_wrapper">
          <div class="comment_delete">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="14" class="delete">
              <path
                d="M1.167 12.448c0 .854.7 1.552 1.555 1.552h6.222c.856 0 1.556-.698 1.556-1.552V3.5H1.167v8.948Zm10.5-11.281H8.75L7.773 0h-3.88l-.976 1.167H0v1.166h11.667V1.167Z"
                fill="#ED6368" /></svg>
            <p class="text_delete">Delete</p>
          </div>
          <div class="comment_edit">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" class="edit">
              <path
                d="M13.479 2.872 11.08.474a1.75 1.75 0 0 0-2.327-.06L.879 8.287a1.75 1.75 0 0 0-.5 1.06l-.375 3.648a.875.875 0 0 0 .875.954h.078l3.65-.333c.399-.04.773-.216 1.058-.499l7.875-7.875a1.68 1.68 0 0 0-.061-2.371Zm-2.975 2.923L8.159 3.449 9.865 1.7l2.389 2.39-1.75 1.706Z"
                fill="#5357B6" /></svg>
            <p class="text_edit">Edit</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>`;

  saveToLocalstorage();
}
//function addEditData
function addEditData() {}

//display edit data
function displayEdit() {}
//function deleteData
function deleteData() {}
//like score

/*************************************Save data to local storage************************************/
function saveToLocalstorage() {
  localStorage.setItem(LocalStorageList, JSON.stringify(storageData));
}

/*************************************AddEventListener************************************/

//reload launch get data
window.addEventListener("load", getData());

//reply to comment button
reply.forEach((element) => {
  element.addEventListener("click", (e) => {
    const body =
      element.parentElement.parentElement.parentElement.parentElement
        .parentElement;
    const displayAnswer = body.children[1];
    const displayId = element.parentElement.children[0].children[1].textContent;
    displayReply(displayAnswer, displayId);
  });
});
