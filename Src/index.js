//Variables
const reply = document.querySelectorAll(".comment_reply");

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

function writeData(data) {
  //amy
  amyAvatar.style.backgroundImage = `url(${data.comments[0].user.image.png})`;
  commentAmy.textContent = data.comments[0].content;
  amyDate.textContent = data.comments[0].createdAt;
  amyID.textContent = data.comments[0].user.username;
  amyScore.textContent = data.comments[0].score;
  //amy for media
  amyCommentMediaNbr.textContent = data.comments[0].score;
  //max
  maxAvatar.style.backgroundImage = `url(${data.comments[1].user.image.png})`;
  maxComment.textContent = data.comments[1].content;
  maxDate.textContent = data.comments[1].createdAt;
  maxId.textContent = data.comments[1].user.username;
  maxScore.textContent = data.comments[1].score;
  //max for media
  maxCommentMediaNbr.textContent = data.comments[1].score;
  //ram
  ramAvatar.style.backgroundImage = `url(${data.comments[1].replies[0].user.image.png})`;
  ramComment.innerHTML = `<p><span>@${data.comments[1].replies[0].replyingTo}</span> ${data.comments[1].replies[0].content}</p>`;
  ramDate.textContent = data.comments[1].replies[0].createdAt;
  ramId.textContent = data.comments[1].replies[0].user.username;
  ramScore.textContent = data.comments[1].replies[0].score;
  //ram for media
  ramCommentMediaNbr.textContent = data.comments[1].replies[0].score;
  //jul (you)
  julAvatar.style.backgroundImage = `url(${data.comments[1].replies[1].user.image.png})`;
  julComment.innerHTML = `<p><span>@${data.comments[1].replies[1].replyingTo}</span> ${data.comments[1].replies[0].content}</p>`;
  julDate.textContent = data.comments[1].replies[1].createdAt;
  julId.textContent = data.comments[1].replies[1].user.username;
  julScore.textContent = data.comments[1].replies[1].score;
  //jul (you) for media
  julCommentMediaNbr.textContent = data.comments[1].replies[1].score;
  //jul for
}

//function addReplyData
function addReplyData() {}

//displayReply
function displayReply() {}

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

//reply button
reply.forEach((element) => {
  element.addEventListener("click", (e) => {
    addReplyData();
    displayReply();
  });
});
