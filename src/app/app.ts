import { Component, ChangeDetectionStrategy, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Slicer {
  id: string;
  name: string;
  description: string;
  logoColor: string;
  pros: string[];
  cons: string[];
}

interface FeatureComparison {
  feature: string;
  category: string;
  description: string;
  orcaslicer: boolean | string;
  prusaslicer: boolean | string;
  cura: boolean | string;
  bambulab: boolean | string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <!-- Header -->
      <header class="bg-indigo-900 text-white shadow-md sticky top-0 z-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row justify-between items-center">
          <div class="flex items-center space-x-3">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-indigo-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <h1 class="text-2xl font-bold tracking-tight">O Guia do Fatiador</h1>
          </div>
          <nav class="mt-4 md:mt-0 flex space-x-6">
            <button (click)="activeTab.set('overview')" [class.text-indigo-300]="activeTab() === 'overview'" [class.border-b-2]="activeTab() === 'overview'" class="hover:text-indigo-200 transition-colors pb-1 border-indigo-300 font-medium">Visão Geral</button>
            <button (click)="activeTab.set('interface')" [class.text-indigo-300]="activeTab() === 'interface'" [class.border-b-2]="activeTab() === 'interface'" class="hover:text-indigo-200 transition-colors pb-1 border-indigo-300 font-medium">Interface</button>
            <button (click)="activeTab.set('features')" [class.text-indigo-300]="activeTab() === 'features'" [class.border-b-2]="activeTab() === 'features'" class="hover:text-indigo-200 transition-colors pb-1 border-indigo-300 font-medium">Recursos</button>
          </nav>
        </div>
      </header>

      <!-- Main Content -->
      <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        @if (activeTab() === 'overview') {
          <div class="space-y-12 animate-fade-in">
            <section class="text-center max-w-3xl mx-auto space-y-6">
              <h2 class="text-4xl font-extrabold text-slate-900">A Ascensão do OrcaSlicer</h2>
              <p class="text-lg text-slate-600 leading-relaxed">
                O ecossistema de impressão 3D está em constante evolução. O OrcaSlicer emergiu como uma força dominante, 
                combinando as melhores partes do PrusaSlicer e Bambu Studio com calibrações avançadas integradas. 
                Neste guia, comparamos visualmente e tecnicamente as principais opções do mercado.
              </p>
            </section>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              @for (slicer of slicers(); track slicer.id) {
                <div class="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow flex flex-col h-full">
                  <div class="flex items-center space-x-3 mb-4">
                    <div class="w-10 h-10 rounded-lg shadow-inner flex items-center justify-center text-white font-bold text-xl" [style.backgroundColor]="slicer.logoColor">
                      {{ slicer.name.charAt(0) }}
                    </div>
                    <h3 class="text-xl font-bold text-slate-800">{{ slicer.name }}</h3>
                  </div>
                  <p class="text-slate-600 text-sm mb-6 flex-grow">{{ slicer.description }}</p>
                  
                  <div class="space-y-4">
                    <div>
                      <h4 class="text-xs font-semibold text-emerald-600 uppercase tracking-wider mb-2">Destaques</h4>
                      <ul class="space-y-1">
                        @for (pro of slicer.pros; track pro) {
                          <li class="text-sm flex items-start">
                            <svg class="w-4 h-4 text-emerald-500 mr-1.5 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
                            <span class="text-slate-700">{{ pro }}</span>
                          </li>
                        }
                      </ul>
                    </div>
                    <div>
                      <h4 class="text-xs font-semibold text-rose-600 uppercase tracking-wider mb-2">Pontos de Atenção</h4>
                      <ul class="space-y-1">
                        @for (con of slicer.cons; track con) {
                          <li class="text-sm flex items-start">
                            <svg class="w-4 h-4 text-rose-400 mr-1.5 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
                            <span class="text-slate-700">{{ con }}</span>
                          </li>
                        }
                      </ul>
                    </div>
                  </div>
                </div>
              }
            </div>
          </div>
        }

        @if (activeTab() === 'interface') {
          <div class="space-y-8 animate-fade-in">
            <div class="text-center mb-10">
              <h2 class="text-3xl font-bold text-slate-900">Comparativo Visual de Interfaces</h2>
              <p class="text-slate-600 mt-2">Como cada fatiador organiza as ferramentas essenciais para o usuário.</p>
            </div>

            <!-- Conceptual Visualizer instead of real images to ensure it works standalone -->
            <div class="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div class="flex border-b border-slate-200 bg-slate-50 overflow-x-auto">
                <button 
                  (click)="selectedSlicerInterface.set('orcaslicer')" 
                  [class.bg-white]="selectedSlicerInterface() === 'orcaslicer'"
                  [class.border-b-2]="selectedSlicerInterface() === 'orcaslicer'"
                  [class.border-indigo-600]="selectedSlicerInterface() === 'orcaslicer'"
                  [class.text-indigo-700]="selectedSlicerInterface() === 'orcaslicer'"
                  class="px-6 py-4 text-sm font-medium text-slate-600 hover:text-slate-900 whitespace-nowrap transition-colors">
                  OrcaSlicer
                </button>
                <button 
                  (click)="selectedSlicerInterface.set('prusaslicer')" 
                  [class.bg-white]="selectedSlicerInterface() === 'prusaslicer'"
                  [class.border-b-2]="selectedSlicerInterface() === 'prusaslicer'"
                  [class.border-orange-500]="selectedSlicerInterface() === 'prusaslicer'"
                  [class.text-orange-700]="selectedSlicerInterface() === 'prusaslicer'"
                  class="px-6 py-4 text-sm font-medium text-slate-600 hover:text-slate-900 whitespace-nowrap transition-colors">
                  PrusaSlicer
                </button>
                <button 
                  (click)="selectedSlicerInterface.set('cura')" 
                  [class.bg-white]="selectedSlicerInterface() === 'cura'"
                  [class.border-b-2]="selectedSlicerInterface() === 'cura'"
                  [class.border-blue-500]="selectedSlicerInterface() === 'cura'"
                  [class.text-blue-700]="selectedSlicerInterface() === 'cura'"
                  class="px-6 py-4 text-sm font-medium text-slate-600 hover:text-slate-900 whitespace-nowrap transition-colors">
                  Ultimaker Cura
                </button>
              </div>

              <div class="p-6 bg-slate-100 min-h-[500px] flex items-center justify-center">
                <!-- Abstract UI Representation -->
                <div class="w-full max-w-4xl aspect-video bg-slate-800 rounded-lg shadow-xl overflow-hidden flex flex-col relative transition-all duration-500"
                     [ngClass]="{
                       'ring-4 ring-indigo-500/50': selectedSlicerInterface() === 'orcaslicer',
                       'ring-4 ring-orange-500/50': selectedSlicerInterface() === 'prusaslicer',
                       'ring-4 ring-blue-500/50': selectedSlicerInterface() === 'cura'
                     }">
                  
                  <!-- Top Bar -->
                  <div class="h-10 bg-slate-900 border-b border-slate-700 flex items-center px-4 justify-between">
                    <div class="flex space-x-2">
                      <div class="w-3 h-3 rounded-full bg-rose-500"></div>
                      <div class="w-3 h-3 rounded-full bg-amber-500"></div>
                      <div class="w-3 h-3 rounded-full bg-emerald-500"></div>
                    </div>
                    
                    @if (selectedSlicerInterface() === 'orcaslicer' || selectedSlicerInterface() === 'prusaslicer') {
                      <div class="flex space-x-4">
                        <div class="h-5 w-24 bg-slate-700 rounded text-[10px] text-slate-300 flex items-center justify-center">Prepare</div>
                        <div class="h-5 w-24 bg-slate-800 rounded text-[10px] text-slate-400 flex items-center justify-center">Preview</div>
                        @if (selectedSlicerInterface() === 'orcaslicer') {
                           <div class="h-5 w-24 bg-slate-800 rounded text-[10px] text-slate-400 flex items-center justify-center">Device</div>
                           <div class="h-5 w-24 bg-slate-800 rounded text-[10px] text-slate-400 flex items-center justify-center">Calibration</div>
                        }
                      </div>
                    } @else {
                      <div class="flex space-x-2">
                        <div class="h-6 w-32 bg-blue-600/20 rounded border border-blue-500/50 text-[10px] text-blue-300 flex items-center px-2">Ender 3 V2</div>
                        <div class="h-6 w-40 bg-slate-800 rounded text-[10px] text-slate-300 flex items-center px-2">Standard Quality - 0.2mm</div>
                      </div>
                    }
                  </div>

                  <div class="flex-grow flex relative">
                    <!-- Left Toolbar -->
                    <div class="w-12 bg-slate-800 border-r border-slate-700 flex flex-col items-center py-4 space-y-4">
                      <div class="w-8 h-8 rounded bg-slate-700 mb-4"></div>
                      <div class="w-6 h-6 rounded-full bg-slate-600"></div>
                      <div class="w-6 h-6 rounded-full bg-slate-600"></div>
                      <div class="w-6 h-6 rounded-full bg-slate-600"></div>
                      <div class="w-6 h-6 rounded-full bg-slate-600"></div>
                    </div>

                    <!-- 3D Viewport (Center) -->
                    <div class="flex-grow bg-slate-900 relative flex items-center justify-center perspective-1000">
                      <!-- Grid -->
                      <div class="absolute w-64 h-64 border border-slate-700 rounded-sm transform rotate-x-60 -translate-y-8 flex items-center justify-center"
                           style="background-image: linear-gradient(to right, #334155 1px, transparent 1px), linear-gradient(to bottom, #334155 1px, transparent 1px); background-size: 20px 20px;">
                        
                        <!-- Abstract 3D Model -->
                        <div class="w-20 h-24 bg-gradient-to-t from-slate-600 to-slate-400 shadow-[0_0_15px_rgba(0,0,0,0.5)] transform -translate-y-12 translate-z-10"
                             [ngClass]="{
                               'from-indigo-600 to-indigo-400': selectedSlicerInterface() === 'orcaslicer',
                               'from-orange-600 to-orange-400': selectedSlicerInterface() === 'prusaslicer',
                               'from-blue-600 to-blue-400': selectedSlicerInterface() === 'cura'
                             }">
                        </div>
                      </div>
                    </div>

                    <!-- Right Panel -->
                    <div class="w-72 bg-slate-800 border-l border-slate-700 flex flex-col"
                         [ngClass]="{'w-80': selectedSlicerInterface() === 'orcaslicer'}">
                      
                      <!-- Settings Area -->
                      <div class="flex-grow p-4 overflow-y-auto space-y-4">
                        @if (selectedSlicerInterface() === 'orcaslicer' || selectedSlicerInterface() === 'prusaslicer') {
                           <!-- Prusa/Orca style tabs -->
                           <div class="flex border-b border-slate-700 mb-4">
                             <div class="px-2 py-1 text-xs text-white border-b-2 border-indigo-500">Quality</div>
                             <div class="px-2 py-1 text-xs text-slate-400">Strength</div>
                             <div class="px-2 py-1 text-xs text-slate-400">Speed</div>
                             <div class="px-2 py-1 text-xs text-slate-400">Support</div>
                           </div>
                           
                           <!-- Setting rows -->
                           <div class="space-y-3">
                             <div class="flex justify-between items-center">
                               <div class="text-xs text-slate-300">Layer height</div>
                               <div class="w-16 h-6 bg-slate-900 border border-slate-600 rounded text-xs text-right px-1 flex items-center justify-end">0.20</div>
                             </div>
                             <div class="flex justify-between items-center">
                               <div class="text-xs text-slate-300">First layer height</div>
                               <div class="w-16 h-6 bg-slate-900 border border-slate-600 rounded text-xs text-right px-1 flex items-center justify-end">0.20</div>
                             </div>
                             
                             <div class="mt-4 pt-4 border-t border-slate-700">
                               <div class="text-xs font-bold text-slate-200 mb-2">Walls and surfaces</div>
                               <div class="flex justify-between items-center mt-2">
                                 <div class="text-xs text-slate-300">Wall loops</div>
                                 <div class="w-16 h-6 bg-slate-900 border border-slate-600 rounded text-xs text-right px-1 flex items-center justify-end">3</div>
                               </div>
                             </div>
                             
                             @if (selectedSlicerInterface() === 'orcaslicer') {
                               <!-- Orca specific settings mock -->
                               <div class="mt-4 pt-4 border-t border-slate-700">
                                 <div class="text-xs font-bold text-indigo-300 mb-2">Precise Wall</div>
                                 <div class="flex justify-between items-center mt-2">
                                   <div class="text-xs text-slate-300">Outer wall spacing</div>
                                   <div class="w-16 h-6 bg-slate-900 border border-slate-600 rounded text-xs text-right px-1 flex items-center justify-end">0.42</div>
                                 </div>
                               </div>
                             }
                           </div>
                        } @else {
                           <!-- Cura style dropdowns -->
                           <div class="bg-slate-700 rounded p-2 flex justify-between items-center cursor-pointer mb-2">
                             <span class="text-xs font-bold text-slate-200">Quality</span>
                             <svg class="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
                           </div>
                           <div class="pl-2 space-y-2 mb-4">
                             <div class="flex justify-between items-center">
                               <div class="text-xs text-slate-300">Layer Height</div>
                               <div class="w-16 h-6 bg-slate-900 border border-slate-600 rounded text-xs text-right px-1 flex items-center justify-end">0.2</div>
                             </div>
                           </div>
                           
                           <div class="bg-slate-700 rounded p-2 flex justify-between items-center cursor-pointer mb-2">
                             <span class="text-xs font-bold text-slate-200">Walls</span>
                             <svg class="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
                           </div>
                           
                           <div class="bg-slate-700 rounded p-2 flex justify-between items-center cursor-pointer mb-2">
                             <span class="text-xs font-bold text-slate-200">Infill</span>
                             <svg class="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
                           </div>
                        }
                      </div>

                      <!-- Bottom Action Area -->
                      <div class="h-20 border-t border-slate-700 bg-slate-800/80 p-4 flex items-center justify-end">
                        <button class="px-6 py-2 rounded text-white text-sm font-bold shadow-lg transition-transform hover:scale-105"
                                [ngClass]="{
                                  'bg-emerald-600 hover:bg-emerald-500': selectedSlicerInterface() === 'orcaslicer',
                                  'bg-orange-600 hover:bg-orange-500': selectedSlicerInterface() === 'prusaslicer',
                                  'bg-blue-600 hover:bg-blue-500': selectedSlicerInterface() === 'cura'
                                }">
                          Slice now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Interface Description -->
              <div class="bg-white p-6 border-t border-slate-200">
                <h3 class="text-xl font-bold text-slate-800 mb-3">
                  @switch (selectedSlicerInterface()) {
                    @case ('orcaslicer') { Fluxo Baseado em Projetos }
                    @case ('prusaslicer') { Painéis Laterais Clássicos }
                    @case ('cura') { Abordagem Oculta/Exposta }
                  }
                </h3>
                <p class="text-slate-600">
                  @switch (selectedSlicerInterface()) {
                    @case ('orcaslicer') {
                      O OrcaSlicer herda a interface limpa orientada a projetos do Bambu Studio. 
                      A grande inovação visual é a separação clara no topo entre "Prepare" (onde você configura o modelo), 
                      "Preview" (resultado do fatiamento), "Device" (controle direto da impressora conectada) e 
                      "Calibration" (um menu exclusivo e integrado para gerar testes de fluxo, PA, etc). 
                      As configurações à direita são organizadas logicamente com ícones claros.
                    }
                    @case ('prusaslicer') {
                      O PrusaSlicer utiliza um painel lateral direito denso, rico em informações. 
                      É excelente para visualizar rapidamente muitas configurações de uma vez. 
                      Utiliza um sistema de cores (verde, amarelo, vermelho) indicando o nível de complexidade da configuração, 
                      permitindo aos usuários iniciantes esconderem opções avançadas. A alternância entre edição 3D e preview 
                      fica tradicionalmente no canto inferior esquerdo ou abas superiores.
                    }
                    @case ('cura') {
                      A interface do Cura prioriza a visualização 3D, mantendo as configurações em um menu flutuante 
                      retrátil à direita. Por padrão, oculta a maioria das configurações para não sobrecarregar novatos, 
                      exigindo o uso da barra de pesquisa ou a ativação do modo "Advanced/Expert" para revelar seu 
                      vasto motor de opções. É uma interface mais "limpa" inicialmente, mas que exige mais cliques para ajustes finos.
                    }
                  }
                </p>
              </div>
            </div>
          </div>
        }

        @if (activeTab() === 'features') {
          <div class="space-y-8 animate-fade-in">
            <div class="text-center mb-8">
              <h2 class="text-3xl font-bold text-slate-900">Matriz de Recursos</h2>
              <p class="text-slate-600 mt-2">Comparativo técnico direto das funcionalidades mais buscadas.</p>
            </div>

            <!-- Category Filter -->
            <div class="flex flex-wrap gap-2 justify-center mb-6">
              <button (click)="featureFilter.set('all')" 
                      [class.bg-indigo-600]="featureFilter() === 'all'" [class.text-white]="featureFilter() === 'all'"
                      [class.bg-slate-200]="featureFilter() !== 'all'" [class.text-slate-700]="featureFilter() !== 'all'"
                      class="px-4 py-2 rounded-full text-sm font-medium transition-colors hover:bg-indigo-500 hover:text-white">
                Todos
              </button>
              <button (click)="featureFilter.set('Calibration')" 
                      [class.bg-indigo-600]="featureFilter() === 'Calibration'" [class.text-white]="featureFilter() === 'Calibration'"
                      [class.bg-slate-200]="featureFilter() !== 'Calibration'" [class.text-slate-700]="featureFilter() !== 'Calibration'"
                      class="px-4 py-2 rounded-full text-sm font-medium transition-colors hover:bg-indigo-500 hover:text-white">
                Calibração
              </button>
              <button (click)="featureFilter.set('Slicing Engine')" 
                      [class.bg-indigo-600]="featureFilter() === 'Slicing Engine'" [class.text-white]="featureFilter() === 'Slicing Engine'"
                      [class.bg-slate-200]="featureFilter() !== 'Slicing Engine'" [class.text-slate-700]="featureFilter() !== 'Slicing Engine'"
                      class="px-4 py-2 rounded-full text-sm font-medium transition-colors hover:bg-indigo-500 hover:text-white">
                Motor de Fatiamento
              </button>
              <button (click)="featureFilter.set('Workflow')" 
                      [class.bg-indigo-600]="featureFilter() === 'Workflow'" [class.text-white]="featureFilter() === 'Workflow'"
                      [class.bg-slate-200]="featureFilter() !== 'Workflow'" [class.text-slate-700]="featureFilter() !== 'Workflow'"
                      class="px-4 py-2 rounded-full text-sm font-medium transition-colors hover:bg-indigo-500 hover:text-white">
                Fluxo de Trabalho
              </button>
            </div>

            <div class="overflow-x-auto bg-white rounded-xl shadow-sm border border-slate-200">
              <table class="w-full text-left border-collapse">
                <thead>
                  <tr class="bg-slate-50 border-b border-slate-200 text-sm">
                    <th class="p-4 font-semibold text-slate-700 w-1/4">Recurso</th>
                    <th class="p-4 font-semibold text-center border-l border-slate-200 w-3/16">
                      <div class="text-indigo-700">OrcaSlicer</div>
                    </th>
                    <th class="p-4 font-semibold text-center border-l border-slate-200 w-3/16">
                      <div class="text-orange-600">PrusaSlicer</div>
                    </th>
                    <th class="p-4 font-semibold text-center border-l border-slate-200 w-3/16">
                      <div class="text-blue-600">Bambu Studio</div>
                    </th>
                    <th class="p-4 font-semibold text-center border-l border-slate-200 w-3/16">
                      <div class="text-sky-600">Ultimaker Cura</div>
                    </th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-100">
                  @for (feature of filteredFeatures(); track feature.feature) {
                    <tr class="hover:bg-slate-50/50 transition-colors group">
                      <td class="p-4">
                        <div class="font-medium text-slate-800">{{ feature.feature }}</div>
                        <div class="text-xs text-slate-500 mt-1">{{ feature.description }}</div>
                        <span class="inline-block mt-2 px-2 py-0.5 bg-slate-100 text-slate-500 text-[10px] rounded-full uppercase tracking-wide">
                          {{ feature.category }}
                        </span>
                      </td>
                      <td class="p-4 border-l border-slate-100 text-center align-middle" [ngClass]="{'bg-indigo-50/30': feature.orcaslicer === true}">
                        <ng-container *ngTemplateOutlet="statusIcon; context: {$implicit: feature.orcaslicer}"></ng-container>
                      </td>
                      <td class="p-4 border-l border-slate-100 text-center align-middle">
                        <ng-container *ngTemplateOutlet="statusIcon; context: {$implicit: feature.prusaslicer}"></ng-container>
                      </td>
                      <td class="p-4 border-l border-slate-100 text-center align-middle">
                        <ng-container *ngTemplateOutlet="statusIcon; context: {$implicit: feature.bambulab}"></ng-container>
                      </td>
                      <td class="p-4 border-l border-slate-100 text-center align-middle">
                        <ng-container *ngTemplateOutlet="statusIcon; context: {$implicit: feature.cura}"></ng-container>
                      </td>
                    </tr>
                  }
                </tbody>
              </table>
            </div>

            <!-- Template for Table Cells -->
            <ng-template #statusIcon let-status>
              @if (status === true) {
                <div class="flex justify-center" title="Suportado nativamente">
                  <svg class="w-6 h-6 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
                </div>
              } @else if (status === false) {
                <div class="flex justify-center" title="Não suportado / Ausente">
                  <svg class="w-6 h-6 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" /></svg>
                </div>
              } @else {
                <div class="inline-flex items-center justify-center px-2.5 py-1 text-xs font-medium rounded-md bg-amber-100 text-amber-800 border border-amber-200">
                  {{ status }}
                </div>
              }
            </ng-template>

            <!-- Conclusion Note -->
            <div class="bg-indigo-50 border border-indigo-100 rounded-lg p-6 mt-8 flex flex-col md:flex-row gap-6 items-start">
              <div class="bg-indigo-100 p-3 rounded-full shrink-0">
                <svg class="w-6 h-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <div>
                <h4 class="text-lg font-bold text-indigo-900 mb-2">Conclusão do Guia</h4>
                <p class="text-indigo-800 text-sm leading-relaxed mb-3">
                  O <strong>OrcaSlicer</strong> conquistou a comunidade porque resolve um problema clássico: consolidação. 
                  Antes, usuários utilizavam o PrusaSlicer para fatiar e o SuperSlicer para calibrar, ou plugins complexos no Cura. 
                </p>
                <p class="text-indigo-800 text-sm leading-relaxed">
                  Ao integrar o motor moderno do Prusa/Bambu com ferramentas de calibração nativas (Flow, Pressure Advance, VFA) e 
                  suporte multi-impressora de código aberto, ele se tornou a recomendação padrão para usuários que buscam 
                  extrair o máximo de qualidade dimensional e visual de suas impressoras, independentemente da marca.
                </p>
              </div>
            </div>
          </div>
        }
      </main>

      <!-- Footer -->
      <footer class="bg-slate-900 text-slate-400 py-8 border-t border-slate-800 mt-12">
        <div class="max-w-7xl mx-auto px-4 text-center">
          <p class="text-sm">Desenvolvido com Angular. O Guia do Fatiador - Comparativo Educacional.</p>
          <div class="mt-4 flex justify-center space-x-4 text-xs">
            <span>Nota: O OrcaSlicer é um fork do Bambu Studio, que por sua vez é baseado no PrusaSlicer e Slic3r.</span>
          </div>
        </div>
      </footer>
    </div>
  `,
  styles: [`
    .perspective-1000 {
      perspective: 1000px;
    }
    .rotate-x-60 {
      transform: rotateX(60deg);
    }
    .translate-z-10 {
      transform: translateZ(40px);
    }
    
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    .animate-fade-in {
      animation: fadeIn 0.4s ease-out forwards;
    }
  `]
})
export class App {
  activeTab = signal<'overview' | 'interface' | 'features'>('overview');
  selectedSlicerInterface = signal<'orcaslicer' | 'prusaslicer' | 'cura'>('orcaslicer');
  featureFilter = signal<'all' | 'Calibration' | 'Slicing Engine' | 'Workflow'>('all');

  slicers = signal<Slicer[]>([
    {
      id: 'orcaslicer',
      name: 'OrcaSlicer',
      description: 'O "tudo em um" open-source. Combina a interface do Bambu Studio com recursos avançados de calibração integrados.',
      logoColor: '#4f46e5', // Indigo
      pros: [
        'Menu de calibração nativo incrível (Flow, PA, VFA)',
        'Integração nativa com Klipper/Mainsail/Fluidd',
        'Scarfe Seam (Costura Oculta)',
        'Suporte nativo a dezenas de marcas de impressoras'
      ],
      cons: [
        'Ainda apresenta alguns bugs por ser muito focado na borda da inovação',
        'Pode ser opressor para iniciantes devido à quantidade de opções'
      ]
    },
    {
      id: 'prusaslicer',
      name: 'PrusaSlicer',
      description: 'O padrão ouro de estabilidade. Focado no ecossistema Prusa, mas excelente para qualquer máquina.',
      logoColor: '#ea580c', // Orange
      pros: [
        'Extremamente estável e confiável',
        'Pintura de suportes e pintura multimaterial excelente',
        'Geração de código G eficiente e testado',
        'Ótimo sistema de perfis do sistema'
      ],
      cons: [
        'Falta um menu de calibração passo-a-passo integrado',
        'Gestão de multi-impressoras não nativas pode ser confusa',
        'Interface pode parecer um pouco datada'
      ]
    },
    {
      id: 'bambulab',
      name: 'Bambu Studio',
      description: 'O ecossistema fechado que revolucionou a usabilidade. Baseado no PrusaSlicer, otimizado para Bambu.',
      logoColor: '#16a34a', // Green
      pros: [
        'Interface baseada em "Projeto" excelente (modelo, configs, fotos em um arquivo)',
        'Integração perfeita com impressoras Bambu Lab (câmera, controle)',
        'Fluxo de trabalho de impressão multi-cor (AMS) incomparável'
      ],
      cons: [
        'Foco quase exclusivo em impressoras da própria marca',
        'Não possui as calibrações manuais finas do Orca',
        'Código fechado em componentes de rede'
      ]
    },
    {
      id: 'cura',
      name: 'UltiMaker Cura',
      description: 'O veterano do mercado. Possui o maior motor de configurações, muitas vezes ocultas atrás de plugins.',
      logoColor: '#0284c7', // Sky blue
      pros: [
        'Tree Supports originais e altamente configuráveis',
        'Marketplace de plugins gigantesco',
        'Perfis comunitários para quase qualquer impressora existente',
        'Opções de fatiamento experimentais exclusivas'
      ],
      cons: [
        'Costura (Seam) geralmente inferior aos baseados em Slic3r',
        'Interface pode ser lenta em modelos pesados',
        'Requer muitos plugins para igualar os recursos nativos modernos de outros'
      ]
    }
  ]);

  featuresMatrix = signal<FeatureComparison[]>([
    {
      feature: 'Testes de Calibração Integrados',
      category: 'Calibration',
      description: 'Geração nativa de testes de Flow, Pressure Advance, Temp Tower, etc.',
      orcaslicer: true,
      prusaslicer: false,
      bambulab: 'Básico',
      cura: 'Via Plugin (Calibration Shapes)'
    },
    {
      feature: 'Scarfe Seam',
      category: 'Slicing Engine',
      description: 'Ocultação avançada de costura criando sobreposição gradiente.',
      orcaslicer: true,
      prusaslicer: false, // At the time of typical knowledge, though evolving
      bambulab: true,
      cura: false
    },
    {
      feature: 'Integração de Interface Klipper',
      category: 'Workflow',
      description: 'Visualizar a interface web do Klipper (Mainsail/Fluidd) dentro do fatiador.',
      orcaslicer: true,
      prusaslicer: 'Apenas upload',
      bambulab: false,
      cura: 'Via Plugin (Moonraker)'
    },
    {
      feature: 'Pintura de Suportes Customizados',
      category: 'Slicing Engine',
      description: 'Pintar no modelo 3D onde suportes devem ou não ser gerados.',
      orcaslicer: true,
      prusaslicer: true,
      bambulab: true,
      cura: 'Blocos de suporte'
    },
    {
      feature: 'Gerenciamento Baseado em Projeto (.3mf)',
      category: 'Workflow',
      description: 'Salvar STLs, configurações, placa e metadados num único arquivo limpo.',
      orcaslicer: true,
      prusaslicer: 'Básico',
      bambulab: true,
      cura: 'Básico (.3mf padrão)'
    },
    {
      feature: 'Arachne Engine',
      category: 'Slicing Engine',
      description: 'Gerador de perímetros de largura variável (melhora detalhes finos).',
      orcaslicer: true,
      prusaslicer: true,
      bambulab: true,
      cura: true
    },
    {
      feature: 'Medição Dimensional no Fatiador',
      category: 'Workflow',
      description: 'Ferramenta para medir distâncias entre pontos do modelo 3D antes de fatiar.',
      orcaslicer: true,
      prusaslicer: true,
      bambulab: true,
      cura: 'Via Plugin'
    },
    {
      feature: 'Precise Wall / Compensação de Encolhimento',
      category: 'Calibration',
      description: 'Ajuste fino de tolerâncias dimensionais e encolhimento de furos.',
      orcaslicer: true,
      prusaslicer: 'XY Size Compensation',
      bambulab: true,
      cura: 'Hole Horizontal Expansion'
    }
  ]);

  filteredFeatures = computed(() => {
    const filter = this.featureFilter();
    const features = this.featuresMatrix();
    
    if (filter === 'all') {
      return features;
    }
    return features.filter(f => f.category === filter);
  });
}
