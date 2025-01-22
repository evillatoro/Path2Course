const app = Vue.createApp({

    data() {
        return {
            search: '',
            courses: [],
            transferData: []
        }
    },
    mounted() {
        fetch('./courses.json')
            .then(res => res.json())
            .then(data => {
                this.courses = Object.values(data.Courses)
            })
            .catch(err => console.log(err.message));

        fetch('./transferInformation.json')
            .then(res => res.json())
            .then(data => {
                this.transferData = data;
            })
            .catch(err => console.log(err.message));
    },
    computed: {
        filteredCourses() {
            input = this.search.toUpperCase()

            if (this.courses != null) {
                return this.courses.filter((course) => {
                    return course.Name.match(input)
                })
            }
        },
        filteredCoursesUGA() {
            input = this.search.toUpperCase()

            if (this.transferData != null) {
                return this.transferData.filter((course) => {
                    if (course.Class2) {
                        return course.Class2.match(input);
                    }
                })
            }
        }
    }

})

app.mount('#app')
