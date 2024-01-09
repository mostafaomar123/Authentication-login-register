
const url = "https://tarmeezacademy.com/api/v1";
const postsFetch = fetch(`${url}/posts?limit=15`)
postsFetch
.then((response) => response.json())
.then((json) => {
    const posts = json.data;
    posts.forEach((post) => {
    let postTitle = "";
    if (post.title != null) {
        postTitle = post.title;
    }
    
    const content = `<div class="card shadow my-4">
            <div class="card-header">
                <img src="${post.author.profile_image}" class="rounded-circle border border-1" src="man.svg" alt="" style="width: 40px; height: 40px;">
                <span><b> ${post.author.username}</b></span>
            </div>
            <div class="card-body">
                <img class="w-100" src="${post.image}" alt="">
                <h6 style="color: rgb(193, 193, 193); " class="mt-1">
                ${post.created_at}
                </h6>
                <h5>
                ${postTitle}
                </h5>
                <p>
                ${post.body}
                </p>
                <hr>
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pen"
                        viewBox="0 0 16 16">
                        <path
                        d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z" />
                    </svg>
                    <span>
                        (${post.comments_count}) Comments
                        <span id=""post-tags>
                        <button class="btn-sm rounded-5" style="background-color:gray; color:white">
                        policy
                        </button>
                        <button class="btn-sm rounded-5" style="background-color:gray; color:white">
                        policy
                        </button>
                        <button class="btn-sm rounded-5" style="background-color:gray; color:white">
                        policy
                        </button>
                        </span>
                    </span>
                            
                </div>
            </div>
        </div>`;
        document.getElementById("posts").innerHTML += content;
    });
})
function loginBtnClicked() {
    const username = document.getElementById("username-input").value;
    const password = document.getElementById("password-input").value;
    fetch(`https://tarmeezacademy.com/api/v1/login`, {
      method: "POST",
      body: JSON.stringify({
        username: username,
        password: password,
      }),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        localStorage.setItem("token", json.token);
        localStorage.setItem("username", JSON.stringify(json.user.username));
        const modal = document.getElementById("login-modal");
        const modalInstance = bootstrap.Modal.getInstance(modal);
        modalInstance.hide(modal);
        successAlert("logged in successfully");
        setup();
      })
      .catch((error) => {
        console.log(error);
      });
}

function registerBtnClicked() {
    const name = document.getElementById("register-name-input").value;
    const username = document.getElementById("register-username-input").value;
    const password = document.getElementById("register-password-input").value;
    // const email = document.getElementById("register-email-input").value;
    fetch(`${url}/register`, {
    method: "POST",
    body: JSON.stringify({
    name: name,
    username: username,
    // email: email,
    password: password,
    }),
    headers: {
        "Content-type": "application/json",
    },
    })
    .then((response) => response.json())
    .then((json) => {
        localStorage.setItem("token", json.token);
        localStorage.setItem("username", JSON.stringify(json.user.username));
        const modal = document.getElementById("register-modal");
        const modalInstance = bootstrap.Modal.getInstance(modal);
        modalInstance.hide(modal);
        successAlert("New User Register successfully");
        setup();
    }).catch((error) => {console.log(error)});
}
function successAlert(message) {
    const alertPlaceholder = document.getElementById("liveAlertPlaceholder");
    const appendAlert = (message, type) => {
        const wrapper = document.createElement("div");
        wrapper.setAttribute("id", "wrapper");
        wrapper.innerHTML = [
            `<div class="alert alert-${type} alert-dismissible" role="alert">`,
            `   <div>${message}</div>`,
            '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
            "</div>",
        ].join("");
        alertPlaceholder.append(wrapper);
    }
    appendAlert(message, "success");
    setTimeout(() => {
        const alert = bootstrap.Alert.getOrCreateInstance("#wrapper");
        alert.close();
    },1000)
}
function setup() {
    const token = localStorage.getItem("token")
    const containerLogin = document.getElementById("container-login");
    const containerLogout = document.getElementById("container-logout");
    
    if (token == null) {
        containerLogin.style.display = "block";
        containerLogout.style.display = "none";
    } else {
        containerLogin.style.display = "none";
        containerLogout.style.display = "block";
    }
}
setup()
function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    successAlert("logged out successfully");
    setup()
}
















// function mostafaFetch(url) {
//     let x = function () {
//         console.log(url);
//     }

//     return new MostafaPromise().resolve(x)
// }

// class MostafaPromise  {
//     #success = null;
//     resolve = function (callback) {
//         try {
//             callback()
//             setTimeout(success, 5000);
//         } catch (error) {
//             failure()
//         }
//         return this
//     }
//     successCallback = function (param) {
//         success = param
//     }
// }

// let mp = mostafaFetch("hi")

// mp.successCallback(()=> console.log("success"))

// function myFetch(url) {
//     let block = function () {
//     console.log(url);
//     };
// return new MyPromise().resolve(block);
// }

// class MyPromiseCallBack {
//     successCallBack;
//     failureCallBack;

//     constructor() {
//         this.successCallBack = null;
//         this.failureCallBack = null;
//     }

//     successz = function (success) {
//         this.successCallBack = success;
//     };

//     failurez = function (failure) {
//         this.failureCallBack = failure;
//     };
// }

// class MyPromise {
//     #promiseCallBack = new MyPromiseCallBack();
//     resolve = function (blcok) {
//         setTimeout(() => {
//         try {
//         blcok();
//         this.#promiseCallBack.successCallBack();
//         } catch (error) {
//         this.#promiseCallBack.failureCallBack();
//         }
//         }, 1);
//     return this;
//     };
//     success = function (success) {
//         this.#promiseCallBack.successz(success);
//         return this;
//     };

//     failure = function (failure) {
//         this.#promiseCallBack.failurez(failure);
//         return this;
//     };
// }

// myFetch("mostafa")
// .success(() => console.log("ff"))
// .failure(() => console.log("failure"));

