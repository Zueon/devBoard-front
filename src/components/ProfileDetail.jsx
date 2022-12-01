import React from "react";
// const ProfileDetailStyle ={
//     display: "block",
//     margin-inline-start: "2px",
//     margin-inline-end: "2px",
//     padding-block-start: "0.35em",
//     padding-inline-start: "0.75em",
//     padding-inline-end: "0.75em",
//     padding-block-end: "0.625em",
//     min-inline-size: "min-content";
// }

const ProfileDetail=({posts})=>{
    return(
        <div>
            <dl>
            <dt>
                e-mail
            </dt>
            <dd>
                {posts.email}
            </dd>
            <div>
                <label for="nickname">닉네임</label><input type="text" value={posts.nickname} readonly/>
            </div>
            <div>
                <label for="name">성함</label><input type="text" value={posts.name} readonly/>
            </div>
            <div>
                <label for="gender">성별</label><input type="text" value={posts.gender} readonly/>
            </div>
            <div>
                <label for="birth">생년월일</label><input type="text" value={posts.birth} readonly/>
            </div>
                {posts.project_board === "" && <div><label for="project">현재참여중인 프로젝트</label><span>{posts.project_board}</span></div>}
                {posts.project_board === "" && <div><label for="study">현재참여중인 스터디그룹</label><span>{posts.project_board}</span></div>}
            </dl>            
        </div>

    )
}
export default ProfileDetail;
