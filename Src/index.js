//Variables
const reply = document.querySelectorAll(".comment_reply");
const replyContainer = document.querySelectorAll(".replycontainer");
const answerContainer = document.querySelectorAll(".answer_container");

//local storage
const LocalStorageList = "jsonStorage";
let storageData = JSON.parse(localStorage.getItem(LocalStorageList));

console.log(storageData);

// getData from Json files
const getData = async () => {
  const response = await fetch(`data.json`);
  const data = await response.json();
  saveToLocalstorage(data);
  writeData(data);
};

getData();

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

//function addReplyData
function writeReply() {
  /*  return { id: id.toString(), name: input.value, completed: false };*/
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
      writeReply(inputData);
    });
  });
}

//function addEditData
function addEditData() {}

//display edit data
function displayEdit() {}
//function deleteData
function deleteData() {}
//like score

/*************************************Save data to local storage************************************/
function saveToLocalstorage(data) {
  localStorage.setItem(LocalStorageList, JSON.stringify(data));
}

/*************************************AddEventListener************************************/

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
