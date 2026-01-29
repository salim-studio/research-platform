import { createApp } from 'vue';
import config from './config.js';

const app = createApp({
    data() {
        return {
            darkTheme: false,
            activeSection: 'dashboard',
            
            // References
            referenceSearch: '',
            referenceFilter: 'all',
            referenceSort: 'date-desc',
            showAddReferenceModal: false,
            newReference: {
                title: '',
                authorsInput: '',
                type: 'article',
                year: new Date().getFullYear(),
                publishedIn: '',
                tagsInput: '',
            },
            
            // Topics
            selectedInterests: [],
            topicType: 'trends',
            
            // Analysis
            selectedAnalysisTool: 'regression',
            selectedDataset: 'dataset1',
            regressionOptions: {
                dependent: '',
                independent: [],
                type: 'linear'
            },
            analysisResults: {},
            analysisInterpretation: '',
            
            // Community
            selectedGroup: 'group1',
            communityTab: 'forum',
            forumSearch: '',
            researcherSearch: '',
            researcherFilter: 'all',
            
            // Review
            activeReviewTool: null,
            uploadedDocument: null,
            reviewOptions: {
                grammar: true,
                style: true,
                terminology: false,
                languageStyle: 'formal',
                checkType: 'standard',
                excludeSources: ''
            },
            reviewResults: null,
            
            // Library
            librarySearch: '',
            selectedLibraryCategory: 'all',
            selectedResourceTypes: ['book', 'article', 'thesis'],
            accessFilter: 'all',
            libraryTab: 'resources',
            
            // Dashboard data
            recentActivities: config.recentActivities,
            upcomingTasks: config.upcomingTasks,
            recommendations: config.recommendations,
            
            // References data
            references: config.references,
            
            // Topics data
            researchAreas: config.researchAreas,
            suggestedTopics: config.suggestedTopics,
            trendInsights: config.trendInsights,
            
            // Analysis data
            analysisTools: config.analysisTools,
            datasets: config.datasets,
            
            // Community data
            researchGroups: config.researchGroups,
            forumTopics: config.forumTopics,
            researchers: config.researchers,
            
            // Review data
            reviewTools: config.reviewTools,
            
            // Library data
            libraryCategories: config.libraryCategories,
            resourceTypes: config.resourceTypes,
            libraryResources: config.libraryResources,
            academicTemplates: config.academicTemplates
        };
    },
    computed: {
        filteredReferences() {
            let result = [...this.references];
            
            // Apply filter
            if (this.referenceFilter !== 'all') {
                result = result.filter(ref => ref.type === this.referenceFilter);
            }
            
            // Apply search
            if (this.referenceSearch.trim()) {
                const searchTerm = this.referenceSearch.toLowerCase();
                result = result.filter(ref => {
                    return ref.title.toLowerCase().includes(searchTerm) || 
                           ref.authors.some(author => author.toLowerCase().includes(searchTerm));
                });
            }
            
            // Apply sort
            switch (this.referenceSort) {
                case 'date-desc':
                    result.sort((a, b) => b.year - a.year);
                    break;
                case 'date-asc':
                    result.sort((a, b) => a.year - b.year);
                    break;
                case 'alpha':
                    result.sort((a, b) => a.title.localeCompare(b.title));
                    break;
            }
            
            return result;
        },
        currentAnalysisTool() {
            return this.analysisTools.find(tool => tool.id === this.selectedAnalysisTool) || {};
        },
        currentDataset() {
            return this.datasets.find(dataset => dataset.id === this.selectedDataset) || { columns: [] };
        },
        independentColumns() {
            const dependent = this.regressionOptions.dependent;
            return this.currentDataset.columns.filter(col => col !== dependent);
        },
        filteredResearchers() {
            let result = [...this.researchers];
            
            if (this.researcherFilter !== 'all') {
                result = result.filter(r => r.field === this.researcherFilter);
            }
            
            if (this.researcherSearch.trim()) {
                const searchTerm = this.researcherSearch.toLowerCase();
                result = result.filter(r => {
                    return r.name.toLowerCase().includes(searchTerm) || 
                           r.affiliation.toLowerCase().includes(searchTerm) ||
                           r.interests.some(interest => interest.toLowerCase().includes(searchTerm));
                });
            }
            
            return result;
        },
        filteredLibraryResources() {
            let result = [...this.libraryResources];
            
            // Apply category filter
            if (this.selectedLibraryCategory !== 'all') {
                result = result.filter(r => r.category === this.selectedLibraryCategory);
            }
            
            // Apply resource type filter
            if (this.selectedResourceTypes.length) {
                result = result.filter(r => this.selectedResourceTypes.includes(r.type));
            }
            
            // Apply access filter
            if (this.accessFilter !== 'all') {
                result = result.filter(r => r.access === this.accessFilter);
            }
            
            // Apply search
            if (this.librarySearch.trim()) {
                const searchTerm = this.librarySearch.toLowerCase();
                result = result.filter(r => {
                    return r.title.toLowerCase().includes(searchTerm) || 
                           r.authors.some(author => author.toLowerCase().includes(searchTerm)) ||
                           r.tags.some(tag => tag.toLowerCase().includes(searchTerm));
                });
            }
            
            return result;
        }
    },
    methods: {
        toggleTheme() {
            this.darkTheme = !this.darkTheme;
            document.body.classList.toggle('dark-theme', this.darkTheme);
        },
        addNewReference() {
            const newRef = {
                id: Date.now().toString(),
                title: this.newReference.title,
                authors: this.newReference.authorsInput.split(',').map(a => a.trim()),
                type: this.newReference.type,
                year: parseInt(this.newReference.year),
                publishedIn: this.newReference.publishedIn,
                tags: this.newReference.tagsInput ? this.newReference.tagsInput.split(',').map(t => t.trim()) : []
            };
            
            this.references.unshift(newRef);
            this.showAddReferenceModal = false;
            
            // Reset form
            this.newReference = {
                title: '',
                authorsInput: '',
                type: 'article',
                year: new Date().getFullYear(),
                publishedIn: '',
                tagsInput: '',
            };
        },
        toggleInterest(id) {
            const index = this.selectedInterests.indexOf(id);
            if (index === -1) {
                this.selectedInterests.push(id);
            } else {
                this.selectedInterests.splice(index, 1);
            }
        },
        generateTopics() {
            // Simulate API call with loading state
            // In a real application, this would make an API call to get recommended topics
            // Here we're just using the sample data
            console.log("Generating topics based on interests:", this.selectedInterests);
            
            // Visual feedback could be added here (like a loading spinner)
            // For now, we'll just use the predefined data
        },
        runAnalysis() {
            // Simulate running analysis with the selected options
            console.log("Running analysis:", this.selectedAnalysisTool);
            console.log("Dataset:", this.selectedDataset);
            console.log("Options:", this.regressionOptions);
            
            // In a real application, this would send the data to a backend for processing
            // For demo purposes, we'll just populate with sample results
            if (this.selectedAnalysisTool === 'regression') {
                this.analysisResults = {
                    'R²': '0.783',
                    'معامل الارتباط': '0.885',
                    'قيمة P': '0.002',
                    'الخطأ المعياري': '1.234'
                };
                
                this.analysisInterpretation = 'تشير النتائج إلى وجود علاقة قوية بين المتغيرات المستقلة والمتغير التابع، حيث بلغت قيمة معامل التحديد (R²) 0.783 مما يعني أن المتغيرات المستقلة تفسر 78.3% من التباين في المتغير التابع.';
                
                // In a real app, this would also update the chart
                this.updateAnalysisChart();
            }
        },
        activateReviewTool(toolId) {
            this.activeReviewTool = toolId;
            this.reviewResults = null; // Reset results when switching tools
        },
        startReview() {
            if (!this.uploadedDocument) {
                // In a real app, show an error message
                console.log("No document uploaded");
                return;
            }
            
            console.log("Starting review with tool:", this.activeReviewTool);
            console.log("Options:", this.reviewOptions);
            
            // Simulate API call with sample results
            if (this.activeReviewTool === 'plagiarism') {
                this.reviewResults = {
                    similarity: 15,
                    sources: 3,
                    citations: 12,
                    matches: [
                        {
                            id: '1',
                            text: 'تعتبر الشبكات العصبية الاصطناعية من أكثر التقنيات الواعدة في مجال الذكاء الاصطناعي، حيث تستخدم في العديد من التطبيقات مثل التعرف على الصور والتعلم العميق.',
                            source: 'مجلة الذكاء الاصطناعي، المجلد 5، العدد 2، 2021',
                            percentage: 85
                        },
                        {
                            id: '2',
                            text: 'يمكن تصنيف الخوارزميات التطورية إلى عدة فئات منها الخوارزميات الجينية وخوارزميات تحسين السرب وخوارزميات المستعمرات النملية.',
                            source: 'أساسيات الخوارزميات التطورية، د. محمد أحمد، 2019',
                            percentage: 70
                        }
                    ]
                };
                
                // Initialize chart (in a real app)
                this.initPlagiarismChart();
            }
        },
        updateDashboardCharts() {
            // Initialize the research progress chart
            const ctx = document.getElementById('researchProgressChart');
            if (ctx) {
                new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو'],
                        datasets: [{
                            label: 'المراجع المضافة',
                            data: [5, 12, 8, 15, 10, 7],
                            borderColor: '#4285f4',
                            backgroundColor: 'rgba(66, 133, 244, 0.1)',
                        }, {
                            label: 'صفحات تمت قراءتها',
                            data: [20, 45, 30, 60, 40, 80],
                            borderColor: '#34a853',
                            backgroundColor: 'rgba(52, 168, 83, 0.1)',
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                    }
                });
            }
        },
        updateAnalysisChart() {
            const ctx = document.getElementById('analysisChart');
            if (ctx) {
                new Chart(ctx, {
                    type: 'scatter',
                    data: {
                        datasets: [{
                            label: 'البيانات الفعلية',
                            data: [
                                {x: 10, y: 8.04}, {x: 8, y: 6.95}, {x: 13, y: 7.58}, 
                                {x: 9, y: 8.81}, {x: 11, y: 8.33}, {x: 14, y: 9.96},
                                {x: 6, y: 7.24}, {x: 4, y: 4.26}, {x: 12, y: 10.84},
                                {x: 7, y: 4.82}, {x: 5, y: 5.68}
                            ],
                            backgroundColor: 'rgba(66, 133, 244, 0.8)',
                        }, {
                            label: 'خط الانحدار',
                            data: [
                                {x: 4, y: 5}, {x: 14, y: 10}
                            ],
                            type: 'line',
                            borderColor: 'rgba(52, 168, 83, 0.8)',
                            backgroundColor: 'rgba(0, 0, 0, 0)',
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: {
                            x: {
                                title: {
                                    display: true,
                                    text: this.regressionOptions.independent[0] || 'المتغير المستقل'
                                }
                            },
                            y: {
                                title: {
                                    display: true,
                                    text: this.regressionOptions.dependent || 'المتغير التابع'
                                }
                            }
                        }
                    }
                });
            }
        },
        initPlagiarismChart() {
            const ctx = document.getElementById('plagiarismChart');
            if (ctx) {
                new Chart(ctx, {
                    type: 'doughnut',
                    data: {
                        labels: ['محتوى أصلي', 'محتوى مقتبس', 'مراجع صحيحة'],
                        datasets: [{
                            data: [85, 3, 12],
                            backgroundColor: [
                                'rgba(52, 168, 83, 0.8)',
                                'rgba(234, 67, 53, 0.8)',
                                'rgba(251, 188, 5, 0.8)'
                            ]
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                    }
                });
            }
        },
        initTrendChart() {
            const ctx = document.getElementById('trendChart');
            if (ctx) {
                new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: ['الذكاء الاصطناعي', 'علم البيانات', 'الطاقة المتجددة', 'البلوكتشين', 'الحوسبة الكمية'],
                        datasets: [{
                            label: 'الأبحاث المنشورة في 2022',
                            data: [120, 85, 60, 45, 20],
                            backgroundColor: 'rgba(66, 133, 244, 0.8)',
                        }, {
                            label: 'الأبحاث المنشورة في 2023',
                            data: [180, 110, 75, 80, 35],
                            backgroundColor: 'rgba(52, 168, 83, 0.8)',
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: {
                            y: {
                                title: {
                                    display: true,
                                    text: 'عدد الأبحاث المنشورة'
                                }
                            }
                        }
                    }
                });
            }
        }
    },
    mounted() {
        // Initialize charts when the component is mounted
        this.$nextTick(() => {
            this.updateDashboardCharts();
            this.initTrendChart();
            
            // Set initial data for regression
            if (this.currentDataset.columns.length) {
                this.regressionOptions.dependent = this.currentDataset.columns[0];
                this.regressionOptions.independent = [this.currentDataset.columns[1]];
            }
        });
        
        // Check if dark mode is preferred
        const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (prefersDarkMode) {
            this.darkTheme = true;
            document.body.classList.add('dark-theme');
        }
    }
});

app.mount('#app');