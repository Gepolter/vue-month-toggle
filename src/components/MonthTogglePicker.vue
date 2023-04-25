<template>
    <div class="filter-wrapper">
        <div class="nav-menu-item" :class="{expand : clicked, collapse : !(clicked)}">
            <div class="nav-header">
                <!--
                @click="clicked = !clicked"   
                -->
                <!--img class="image-fit" src="../assets/images/calendar.png" alt="Monate"-->
            </div>
            <div class="year-picker">
                <div class="btn-div">
                    <button @click="prevYear()">&lt;</button>
                    <div>{{this.year}}</div>
                    <button @click="nextYear()">></button>
                </div>
                <hr class="rounded">
                <div class="animated-grid" id="grid">
                    <div id="c0" class="card" :class="[activityArray[0].active ? 'active' : 'inactive']" @click="toggleMonth(0)">{{ getLocaleMonth(0) }}</div>
                    <div id="c1" class="card" :class="[activityArray[1].active ? 'active' : 'inactive']" @click="toggleMonth(1)">{{ getLocaleMonth(1) }}</div>
                    <div id="c2" class="card" :class="[activityArray[2].active ? 'active' : 'inactive']" @click="toggleMonth(2)">{{ getLocaleMonth(2) }}</div>
                    <div id="c3" class="card" :class="[activityArray[3].active ? 'active' : 'inactive']" @click="toggleMonth(3)">{{ getLocaleMonth(3) }}</div>
                    <div id="c4" class="card" :class="[activityArray[4].active ? 'active' : 'inactive']" @click="toggleMonth(4)">{{ getLocaleMonth(4) }}</div>
                    <div id="c5" class="card" :class="[activityArray[5].active ? 'active' : 'inactive']" @click="toggleMonth(5)">{{ getLocaleMonth(5) }}</div>
                    <div id="c6" class="card" :class="[activityArray[6].active ? 'active' : 'inactive']" @click="toggleMonth(6)">{{ getLocaleMonth(6) }}</div>
                    <div id="c7" class="card" :class="[activityArray[7].active ? 'active' : 'inactive']" @click="toggleMonth(7)">{{ getLocaleMonth(7) }}</div>
                    <div id="c8" class="card" :class="[activityArray[8].active ? 'active' : 'inactive']" @click="toggleMonth(8)">{{ getLocaleMonth(8) }}</div>
                    <div id="c9" class="card" :class="[activityArray[9].active ? 'active' : 'inactive']" @click="toggleMonth(9)">{{ getLocaleMonth(9) }}</div>
                    <div id="c10" class="card" :class="[activityArray[10].active ? 'active' : 'inactive']" @click="toggleMonth(10)">{{ getLocaleMonth(10) }}</div>
                    <div id="c11" class="card" :class="[activityArray[11].active ? 'active' : 'inactive']" @click="toggleMonth(11)">{{ getLocaleMonth(11) }}</div>
                </div>
                <button v-if="selectionMode=='onConfirm'" @click="setTimeslot()">confirm</button>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    components:{

    },
    
    data() {
        return {
            monthsArray:[],
            currentDate: new Date(),
            year: new Date().getFullYear(),
            clicked: true,

            activityArray:[
                {name: "jan", active : false},
                {name: "feb", active : false},
                {name: "mar", active : false},
                {name: "apr", active : false},
                {name: "may", active : false},
                {name: "jun", active : false},
                {name: "jul", active : false},
                {name: "aug", active : false},
                {name: "sep", active : false},
                {name: "oct", active : false},
                {name: "nov", active : false},
                {name: "dec", active : false},
            ],
            locales:[
                //Date formats not needed until daily selection becomes available
                {
                    name: "en",
                    months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                    dateFormat: "mm-dd-yyyy"
                },
                {
                    name:"de",
                    months:["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"],
                    dateFormat: "dd-mm-yyyy"
                },
                {
                    name:"fr",
                    months:["Janivier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"],
                    dateFormat: "dd-mm-yyyy"
                },
                {
                    name:"sp",
                    months:["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
                    dateFormat: "dd-mm-yyyy"
                },                
                {
                    name:"jp",
                    months:["ichi-gatsu", "ni-gatsu", "san-gatsu", "shi-gatsu", "go-gatsu", "roku-gatsu", "shichi-gatsu", "hachi-gatsu", "ku-gatsu", "juu-gatsu", "juuichi-gatsu", "juuni-gatsu"],
                    dateFormat: "dd-mm-yyyy"
                }

            ],
            textModes:[
                "fullText", "abbreviated"
            ],
            selectionModes:[
                "onConfirm", "onToggle"
            ]
        }
    },
    props:{
        modelValue: {
            type: Object
        },
        //TODO: implement dis
        locale: {
            type: String,
            default: "en"
        },
        textMode: {
            type: String,
            default: "fullText"
        },
        selectionMode: {
            type: String,
            default: "onConfirm"
        },
        themes: []
    },
    emits:['update:modelValue'],
        
    computed:{
        value:{
            get() {
                return this.modelValue
            },
            set(results){
                this.$emit('update:modelValue', results)
            }
        }
    },
    methods:{
        getLocaleMonth(monthInt){
            if(this.textMode == "abbreviated"){
                return this.locales.find(e => e.name === this.locale).months[monthInt].substring(0,3)
            }
            return this.locales.find(e => e.name === this.locale).months[monthInt]
        }, 

        toggleMonth(monthInt){
            //this.activityArray[monthInt].active = !this.activityArray[monthInt].active
            if(this.activityArray[monthInt].active == false){
                this.activityArray[monthInt].active = true 
                this.monthsArray.push({year: this.year, month: monthInt})
            }else{
                this.activityArray[monthInt].active = false
                this.monthsArray = this.monthsArray.filter(e => !(e.year == this.year && e.month == monthInt))
            }
            console.log(this.selectionMode)
            if(this.selectionMode=="onToggle"){
                console.log("setting timeslots")
                this.setTimeslot()
            }
        },
        prevYear(){
            this.year--
            this.resetActivity()
        },
        nextYear(){
            this.year++
            this.resetActivity()
        },
        resetActivity(){
            for(var i = 0; i < this.activityArray.length; i++){
                if(
                    this.monthsArray.find(e =>
                        e.year == this.year && e.month == i
                    )
                ){
                    this.activityArray[i].active = true
                }else{
                    this.activityArray[i].active = false
                }
                var e = document.getElementById("c" + i.toString())
                e.classList.remove("card")
                void e.offsetWidth
                e.classList.add("card")
            }
            //reset animation
            
            
        },
        setTimeslot(){
            this.monthsArray.sort((a,b) => {
                if (a.year === b.year){
                    return a.month < b.month ? -1 : 1
                } else{
                    return a.year < b.year ? -1 : 1
                }
            })
            this.value = JSON.parse(JSON.stringify(this.monthsArray))
        }
    },
    created(){
        //this.modelValue = this.getTimeslots
    }
}

</script>

<style scoped>

    .year-picker{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-evenly;
    }

    .btn-div{
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-evenly;
        
    }
    button{
        border: 1px solid black;
        display: flex;
        align-items:flex-start
    }
    .animated-grid {
        height: fit-content;
        width: fit-content;
        display: grid;
        gap: 1rem;
        margin: 1em;

        /* Explicit grid */
        grid-template-areas:
            'a a b b c c'
            'd d e e f f'
            'g g h h i i'
            'j j k k l l';
            
            
        grid-template-rows: auto;
        grid-template-columns: auto;

        --stagger-delay: 20ms;
    }

    @keyframes cardEntrance {
        from {
            opacity: 0;
            transform: scale(0.3);
            filter: hue-rotate(180deg);
        }
        to {
            opacity: 1;
            transform: scale(1);
            filter: hue-rotate(0deg);
        }
    }

   
    .card:nth-child(1) {
        grid-area: a;
        animation-delay: calc(1 * var(--stagger-delay));
    }
    .card:nth-child(2) {
        grid-area: b;
        animation-delay: calc(2 * var(--stagger-delay));
    }
    .card:nth-child(3) {
        grid-area: c;
        animation-delay: calc(3 * var(--stagger-delay));
    }
    .card:nth-child(4) {
        grid-area: d;
        animation-delay: calc(4 * var(--stagger-delay));
    }
    .card:nth-child(5) {
        grid-area: e;
        animation-delay: calc(5 * var(--stagger-delay));
    }
    .card:nth-child(6) {
        grid-area: f;
        animation-delay: calc(6 * var(--stagger-delay));
    }
    .card:nth-child(7) {
        grid-area: g;
        animation-delay: calc(7 * var(--stagger-delay));
    }
    .card:nth-child(8) {
        grid-area: h;
        animation-delay: calc(8 * var(--stagger-delay));
    }
    .card:nth-child(9) {
        grid-area: i;
        animation-delay: calc(9 * var(--stagger-delay));
    }
    .card:nth-child(10) {
        grid-area: j;
        animation-delay: calc(10 * var(--stagger-delay));
    }
    .card:nth-child(11) {
        grid-area: k;
        animation-delay: calc(11 * var(--stagger-delay));
    }
    .card:nth-child(12) {
        grid-area: l;
        animation-delay: calc(12 * var(--stagger-delay));
    } 
    .card {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-family: "Festival";
        font-size: 1rem;
        color: rgb(70, 68, 68);
        box-shadow: rgba(3, 8, 20, 0.1) 0px 0.15rem 0.5rem, rgba(2, 8, 20, 0.1) 0px 0.075rem 0.175rem;
        height: 100%;
        width: 100%;
        border-radius: 10px;
        transition: all 500ms;
        overflow: hidden;        
        background-size: cover;
        background-position: center;
        animation: cardEntrance 700ms ease-out;
        animation-fill-mode: backwards;
        caret-color: transparent;
        cursor: pointer;
    }
    .active{
        color: black;
        border: 1px solid black;
        background-color: whitesmoke;
    }
    .inactive{
        color: white;
        border: 1px solid rgb(70, 68, 68);
        background-color: black;
    }
    .card:hover {
        box-shadow: rgba(2, 8, 20, 0.1) 0px 0.35em 1.175em, rgba(2, 8, 20, 0.08) 0px 0.175em 0.5em;
        transform: translateY(-3px) scale(1.1);
    }
    hr.rounded {
        border-top: 8px solid #bbb;
        border-radius: 5px;
        width: 100%;
    }
    

    /*themes*/
    .light{
        --color: grey;
        background: whitesmoke;
    }
    .background-style{
        transition: all 2s;
    }
    .text{
        transition: all 2s;
    }
</style>
