<template>
  <!-- you can have more than one root element inside the template -->
  <div id="app">
    <div id='header'>

      <div style="color:white; height:64px;"><a style="color: white; text-decoration: none; font-size:24px;" href=".">Path2Course :) </a>
        <br>
        <input type="text" v-model="search" placeholder="search GT courses">
      </div>
    </div>
    <div id='main'>
      <!-- the container needs to have a size to trigger overflow -->
      <div class="container">
        <div class="divUGA">University of Georgia</div>
        <ul class="content" v-if="transferData.length">
          <div v-if="ugaFilteredList.length">
            <div v-for="course in ugaFilteredList" :key="course.ShortName">
              <span class="anchor" :id="course.ShortName + '-anchor'"></span>
              <li :id="course.ShortName">
                <h3>{{ course.Class }}</h3>
                <h4 v-if="course.Title">
                  <p style="color:#A28D5B">Description: <br>
                  </p>
                  {{ course.Title }}
                  <p style="color:#A28D5B">Level: <br>
                  </p>
                  {{ course.Level }}
                  <p style="color:#A28D5B">Minimum Grade: <br>
                  </p>
                  {{ course.MinimumGrade }}
                  <p style="color:#A28D5B">Georiga Tech Equivalent: <br>
                  </p>

                  <a style="color: black" :href="'#' + course.Class2 + '-anchor'">
                    <p>{{ course.Class2 }}</p>
                  </a>
                </h4>
              </li>
            </div>
          </div>
          <div v-else>
            <br>
            <p style="color:white; text-align: center;">no matches...</p>
          </div>
        </ul>
        <div v-else>
          <br>
          <p style="color:white; text-align: center;">loading courses...</p>
        </div>

      </div>

      <div class="container">
        <div class="divH">Georgia Tech</div>
        <ul class="content" v-if="courses.length">
          <div v-if="gtFilteredList.length">
            <div v-for="course in gtFilteredList" :key="course.ShortName">
              <span class="anchor" :id="course.ShortName + '-anchor'"></span>
              <li :id="course.ShortName">
                <h3>{{ course.Name }}</h3>
                <h4 v-if="course.Description">
                  <p style="color:#A28D5B">Description: </p>{{ course.Description }}
                </h4>
                <ul>
                  <p v-if="course.Prerequisites != null">Prerequisites: </p>
                  <li v-for="prerequisite in course.Prerequisites" class="prerequisite" @click.stop=""
                    :key="prerequisite">
                    <a style="color: #A28D5B" :href="'#' + prerequisite + '-anchor'">
                      <p>{{ prerequisite }}</p>
                    </a>
                  </li>
                </ul>
              </li>
            </div>
          </div>
          <div v-else>
            <br>
            <p style="color:white; text-align: center;">no matches...</p>
          </div>
        </ul>
        <div v-else>
          <br>
          <p style="color:white; text-align: center;">loading courses...</p>
        </div>
      </div>
      <!-- <div style="flex: 1; align-self: center;">
                <p style="color:white; text-align: center;">future feature coming soon...</p>
            </div> -->
    </div>
    <!-- can add more containers -->
    <div id='footer' style="color: white;"> Made with ❤️ by Edwin Villatoro</div>
  </div>
</template>

<!-- export the component here -->
<script>
import debounce from 'lodash/debounce';

export default {
  name: 'App', // you don't have to give your components a name
  data() {
    return {
      searchTerm: '',
      search: '',
      courses: [],
      transferData: [],
      gtFilteredList: [],
      ugaFilteredList: []
    }
  },
  mounted() {
    fetch('courses.json')
      .then(res => res.json())
      .then(data => {
        this.courses = Object.values(data.Courses)
        this.gtFilteredList = Object.values(data.Courses)
      })
      .catch(err => console.log(err.message))

    fetch('transferInformation.json')
      .then(res => res.json())
      .then(data => {
        this.transferData = data;
        this.ugaFilteredList = data;
      })
      .catch(err => console.log(err.message))
  },
  computed: {
    filteredCourses() {
      console.log('filteredCourses')
      return this.gtFilteredList
    },
    filteredCoursesUGA() {
      console.log('filteredCoursesUGA')
      return this.ugaFilteredList
    }

    // filteredCourses() {
    //   console.log('filteredCourses')
    //   var input = this.search.toUpperCase()

    //   if (this.courses != null) {
    //     return this.courses.filter((course) => {
    //       return course.Name.match(input)
    //     })
    //   }
    //   return this.performSearch()
    // },
    // filteredCoursesUGA() {
    //   console.log('filteredCoursesUGA')
    //   var input = this.search.toUpperCase()

    //   if (this.transferData != null) {
    //     return this.transferData.filter((course) => {
    //       if (course.Class2) {
    //         return course.Class2.match(input)
    //       }
    //     })
    //   }
    // }
  },
  watch: {
    search() {
      Promise.all[
        this.performSearch(),
        this.performSearch2()
      ]
    }
  },
  methods: {
    performSearch: debounce(
      function () {
        // let start = Date.now()
        // DO STUFF HERE
        //console.log('performSearch')
        var input = this.search.toUpperCase()

        if (this.courses != null) {
          // add logic where prerequisites show up too
          this.gtFilteredList = this.courses.filter((course) => {
            return (course.Name.match(input) || (course.Prerequisites != null && this.goThroughPrerequisites(course, input)))
          })
        }

        // let end = Date.now()
        // let elapsed = end - start // milliseconds
        // console.log("elapsed time: " + elapsed / 1000 + " seconds")
      },
      275
    ),
    performSearch2: debounce(
      function () {
        // let start = Date.now()
        // DO STUFF HERE
        //console.log('performSearch2')
        var input = this.search.toUpperCase()
        if (this.transferData != null) {
          this.ugaFilteredList = this.transferData.filter((course) => {
            if (course.Class2) {
              return course.Class2.match(input)
            }
          })
        }
        // let end = Date.now()
        // let elapsed = end - start // milliseconds
        //console.log("elapsed time: " + elapsed / 1000 + " seconds")
      },
      275
    ),
    goThroughPrerequisites(course, input) {
      return course.Prerequisites.some((course1) => {
        if (course1.match(input)) {
          return true
        }
      })
    }
  },

} 
</script>

<!-- these styles are globle -->
<!-- styles are placed in head -->
<style>
html {
  height: 100%;
}

body {
  background: black;
  display: block;
  height: 100%;
  width: 100%;
  overflow: hidden;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

input {
  border-radius: 10px;
}

/* shows components as a column*/
#app {
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

/* flex-direction default is row */
#main {
  overflow: hidden;
  flex: 1;
  display: flex;
  align-items: stretch;
}

/* added top 0 to stick header to top */
#header {
  background-color: #A28D5B;
  position: sticky;
  top: 0;
  text-align: center;
}

.container::-webkit-scrollbar,
.container-2::-webkit-scrollbar {
  display: none;
  /* Safari and Chrome */
}

/* each container takes up equal amount of space with flex */
.container {
  display: flex;
  /* do not need to put a width since flex will give one */
  flex: 1;
  flex-direction: column;
  align-items: stretch;
  flex-shrink: 0;
  /* overflow: auto; */
  /* width: 30%; */
  overflow-x: hidden;
  overflow-y: scroll;

  color: black;

  .divH {
    position: sticky;
    top: 0;
    text-align: center;
    background-color: gold;
  }

  .divF {
    position: sticky;
    bottom: 0;
    text-align: center;
    background-color: red;
  }

  .divUGA {
    position: sticky;
    top: 0;
    text-align: center;
    background-color: red;
    color: white;
  }
}

.content {
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: stretch;
  padding: 4px;
}

.container-2 {
  display: flex;
  /* do not need to put a width since flex will give one */
  /* flex: 1; */
  flex-direction: column;
  align-items: stretch;
  overflow: auto;
  width: 30%;
}

.content-display-horizontal {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding: 4px;
  background-color: grey;
}

#footer {
  background-color: #A28D5B;
  position: sticky;
  bottom: 0;
  text-align: center;
}

p,
h3,
ul {
  margin: 0;
  padding: 0;
}

li {
  list-style-type: none;
  background: white;
  margin: 20px auto;
  padding: 10px 20px;
  border-radius: 10px;
  justify-content: space-between;
}

.prerequisite {
  display: inline-table;
}

.anchor {
  scroll-margin-top: 42px;
}

/* added so that in mobile, when keyboard comes up, there is no auto-zoom on the search bar */
input {
  font-size: initial;
}

input:focus {
  font-size: initial;
}
</style>
