const dateContainer = document.querySelector("#this-date");
dateContainer.textContent = new Date();

const API_URL = "https://frcz3-8080.csb.app/";

let page = 1;
let query = "";

const getJobs = async () => {
  const url = `${API_URL}jobs?_page=${page}&_limit=10&q=${query}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error", error);
  }
};

const renderJobs = async () => {
  try {
    const jobList = document.getElementById("jobs");
    jobList.innerHTML = "";
    const jobs = await getJobs();
    jobs.forEach((item) => {
      const el = document.createElement("li");
      el.innerHTML = item.title;
      jobList.appendChild(el);
    });
  } catch (error) {
    console.log("Error", error);
  }
};

renderJobs();

const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

nextBtn.addEventListener("click", () => {
  page++;
  renderJobs();
});
prevBtn.addEventListener("click", () => {
  if (page > 1) {
    page--;
    renderJobs();
  }
});

const searchBtn = document.getElementById("search-btn");
searchBtn.addEventListener("click", () => {
  const searchVal = document.getElementById("search-inp").value;
  query = searchVal;
  renderJobs();
});
