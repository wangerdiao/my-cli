import { input,select } from '@inquirer/prompts' //终端交互库
import { clone } from '../utils/clone'
export interface TemplateInfo {
    name: string; // 模板名称
    downloadUrl: string; // 模板下载地址
    description: string; // 模板描述
    branch: string; // 模板分支
}

export const templates: Map<string, TemplateInfo> = new Map([
    [
        'Vite-Vue3-Typescript-tempalte--完整版',
        {
            name: 'Vite-Vue3-Typescript-tempalte-dev5',
            downloadUrl: 'https://gitlab.com/wangderful-group/dawei-engineerProject.git',
            description: '完整模板',
            branch: 'dev5',
        },
    ],
    [
        'Vite-Vue3-开发版',
        {
            name: 'Vite-Vue3-Typescript-tempalte-dev2',
            downloadUrl: 'https://gitlab.com/wangderful-group/dawei-engineerProject.git',
            description: '开发版',
            branch: 'dev2',
        },
    ],
]);

export async function create(projectName:string) {
    // 初始化模板列表
    const templateList = Array.from(templates).map((item: [string, TemplateInfo]) => {
        const [name, info] = item;
        return {
            name,
            value: name,
            description: info.description,
        };
    });
    if (!projectName) {
        projectName = await input({ message: '请输入项目名称' });
    }

     const templateName = await select({
        message: '请选择模板',
        choices: templateList,
    });
    const info = templates.get(templateName);
    console.log(info);
    if (info) {
        clone(info.downloadUrl, projectName, ['-b', info.branch]);
    }
}