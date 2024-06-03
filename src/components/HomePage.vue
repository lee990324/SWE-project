<template>
    <div class="home">
        <h1>Stock Market Dashboard</h1>
        <div>
            <canvas id="kospiChart"></canvas>
            <canvas id="kosdaqChart"></canvas>
        </div>
    </div>
</template>

<script>
    import { Chart, registerables } from 'chart.js';
    Chart.register(...registerables);

    export default {
        data() {
            return {
                kospiChart: null,
                kosdaqChart: null,
                chartData: {
                    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
                    kospiData: [2900, 2910, 2920, 2930, 2940, 2950],
                    kosdaqData: [950, 955, 960, 965, 970, 975]
                }
            };
        },
        mounted() {
            this.initializeKospiChart();
            this.initializeKosdaqChart();
        },
        methods: {
            initializeKospiChart() {
                const ctx = document.getElementById('kospiChart').getContext('2d');
                this.kospiChart = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: this.chartData.labels,
                        datasets: [{
                            label: 'KOSPI Index',
                            backgroundColor: 'rgba(255, 99, 132, 0.2)',
                            borderColor: 'rgba(255, 99, 132, 1)',
                            data: this.chartData.kospiData,
                            fill: false,
                        }]
                    },
                    options: {
                        responsive: true,
                        scales: {
                            y: {
                                beginAtZero: false
                            }
                        }
                    }
                });
            },
            initializeKosdaqChart() {
                const ctx = document.getElementById('kosdaqChart').getContext('2d');
                this.kosdaqChart = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: this.chartData.labels,
                        datasets: [{
                            label: 'KOSDAQ Index',
                            backgroundColor: 'rgba(54, 162, 235, 0.2)',
                            borderColor: 'rgba(54, 162, 235, 1)',
                            data: this.chartData.kosdaqData,
                            fill: false,
                        }]
                    },
                    options: {
                        responsive: true,
                        scales: {
                            y: {
                                beginAtZero: false
                            }
                        }
                    }
                });
            }
        }
    };
</script>

<style>
    .home {
        max-width: 800px;
        margin: auto;
        text-align: center;
    }
</style>
