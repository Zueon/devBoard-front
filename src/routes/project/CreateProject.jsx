import axios, { formToJSON } from "axios";
import React from "react";

const CreateProject = () => {
  async function submitHandler(e) {
    e.preventDefault();
    console.log("click submit");

    const form = new FormData(e.target);

    const json = formToJSON(form);
    console.log(json);

    const response = await axios({
      method: "post",
      url: "http://localhost:8080/board/ProjectCreate",
      data: json,
    });

    console.log(response);
  }
  return (
    <div>
      <h1>프로젝트 생성 페이지</h1>
      <form onSubmit={submitHandler}>
        <div>
          <label htmlFor="title">title</label>
          <input id="title" type="text" name="title" />
        </div>
        <div>
          <label htmlFor="category_">category_</label>
          <input id="category_" type="text" name="category_" />
        </div>
        <div>
          <label htmlFor="public_">public_</label>
          <input id="public_" type="text" name="public_" />
        </div>
        <div>
          <label htmlFor="writer">writer</label>
          <input id="writer" type="text" name="writer" />
        </div>
        <div>
          <label htmlFor="location_">location_</label>
          <input id="location_" type="text" name="location_" />
        </div>
        <div>
          <label htmlFor="introduction">introduction</label>
          <input id="introduction" type="text" name="introduction" />
        </div>
        <div>
          <label htmlFor="startdate">startdate</label>
          <input id="startdate" type="date" name="startdate" />
        </div>
        <div>
          <label htmlFor="enddate">enddate</label>
          <input id="enddate" type="date" name="enddate" />
        </div>
        <div>
          <input type="submit" value="등록" />
        </div>
      </form>
    </div>
  );
};

export default CreateProject;
