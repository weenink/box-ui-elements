/**
 * @flow
 * @file Helper for the box Task Assignments API
 * @author Box
 */

import Base from './Base';
import {
    ERROR_CODE_FETCH_TASK_COLLABORATOR,
    ERROR_CODE_CREATE_TASK_COLLABORATOR,
    ERROR_CODE_UPDATE_TASK_COLLABORATOR,
    ERROR_CODE_DELETE_TASK_COLLABORATOR,
    API_PAGE_LIMIT,
} from '../constants';

// microservices need different headers than other APIs
const headers = {
    Accept: 'application/json;version=1',
    'Content-Type': 'application/vnd.box+json;version=v2',
};

class TaskCollaborators extends Base {
    getUrlForTaskCollaborators(taskId: string): string {
        return `${this.getBaseApiUrl()}/undoc/tasks/${taskId}/task_collaborators?limit=${API_PAGE_LIMIT}`;
    }

    getUrlForTaskCollaboratorCreate(): string {
        return `${this.getBaseApiUrl()}/undoc/task_collaborators`;
    }

    getUrlForTaskCollaborator(id: string): string {
        return `${this.getBaseApiUrl()}/undoc/task_collaborators/${id}`;
    }

    createTaskCollaborator({
        errorCallback,
        file,
        successCallback,
        task,
        user,
    }: {
        errorCallback: ElementsErrorCallback,
        file: BoxItem,
        successCallback: Function,
        task: { id: string },
        user: { id: string },
    }): void {
        this.errorCode = ERROR_CODE_CREATE_TASK_COLLABORATOR;

        const requestData = {
            data: {
                task: {
                    type: 'task',
                    id: task.id,
                },
                target: {
                    type: 'user',
                    id: user.id,
                },
            },
        };

        this.post({
            id: file.id,
            url: this.getUrlForTaskCollaboratorCreate(),
            data: { ...requestData, headers },
            successCallback,
            errorCallback,
        });
    }

    getTaskCollaborators({
        errorCallback,
        file,
        successCallback,
        task,
    }: {
        errorCallback: ElementsErrorCallback,
        file: { id: string },
        successCallback: Function,
        task: { id: string },
    }): void {
        this.errorCode = ERROR_CODE_FETCH_TASK_COLLABORATOR;
        const url = this.getUrlForTaskCollaborators(task.id);
        this.get({ id: file.id, successCallback, errorCallback, url, requestData: { headers } });
    }

    updateTaskCollaborator({
        errorCallback,
        file,
        successCallback,
        taskCollaborator,
    }: {
        errorCallback: ElementsErrorCallback,
        file: BoxItem,
        successCallback: Function,
        taskCollaborator: { id: string },
    }): void {
        this.errorCode = ERROR_CODE_UPDATE_TASK_COLLABORATOR;

        const requestData = {
            data: { ...taskCollaborator },
        };

        this.put({
            id: file.id,
            url: this.getUrlForTaskCollaborator(taskCollaborator.id),
            data: { ...requestData, headers },
            successCallback,
            errorCallback,
        });
    }

    deleteTaskCollaborator({
        errorCallback,
        file,
        successCallback,
        taskCollaborator,
    }: {
        errorCallback: ElementsErrorCallback,
        file: BoxItem,
        successCallback: Function,
        taskCollaborator: { id: string },
    }): void {
        this.errorCode = ERROR_CODE_DELETE_TASK_COLLABORATOR;

        this.delete({
            id: file.id,
            url: this.getUrlForTaskCollaborator(taskCollaborator.id),
            successCallback,
            errorCallback,
        });
    }
}

export default TaskCollaborators;
