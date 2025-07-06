import { input,select } from '@inquirer/prompts' //终端交互库
import { clone } from '../utils/clone'
import fs from 'fs-extra'; //读取文件
import path from 'path';    
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

//判断文件夹是否存在
export function isOverwrite(fileName: string) {
    console.warn(`${fileName}文件夹存在`);
    return select({
        message: '是否覆盖?',
        choices: [
            { name: '覆盖', value: true },
            { name: '取消', value: false },
        ],
    });
}

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

    // 如果文件夹存在，则提示是否覆盖
    const filePath = path.resolve(process.cwd(), projectName);
    if (fs.existsSync(filePath)) {
        const run = await isOverwrite(projectName);
        if (run) {
            await fs.remove(filePath);
        } else {
            return; // 不覆盖直接结束
        }
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