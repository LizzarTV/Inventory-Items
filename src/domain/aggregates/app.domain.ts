import {Nullable} from "../../shared";
import {AggregateRoot} from "@nestjs/cqrs";
import {RpcException} from "@nestjs/microservices";
import {HttpStatus} from "@nestjs/common";
import {NotEmptyStringValidation} from "../validations/not-empty.validation";

export class AppDomain extends AggregateRoot {

    constructor(
        private readonly id: string,
        private title: string,
        private slug: string,
        private active: boolean,
        private readonly created_at: Date,
        private updated_at: Nullable<Date>,
        private deleted_at: Nullable<Date>,
    ) {
        super();
    }

    public isDeleted(): boolean {
        return !!this.deleted_at;
    }

    public isUpdated(): boolean {
        return !!this.updated_at;
    }

    public toAnemic(): any {
        return {
            id: this.id,
            title: this.title,
            slug: this.slug,
            active: this.active,
            created_at: this.created_at,
            updated_at: this.updated_at,
            deleted_at: this.deleted_at,
            isUpdated: this.isUpdated(),
            isDeleted: this.isDeleted(),
        }
    }

    public createItem(): void {
        try {
            this.validateAll(this.title, this.slug);
            // TODO: CreatedEvent
        } catch (e) {
            // TODO: ErrorEvent
        }
    }

    public updateTitle(title: string): void {
        try {
            this.validateTitle(title);
            this.title = title;
            // TODO: UpdatedEvent
        } catch (e) {
            // TODO: ErrorEvent
        }
    }

    public updateSlug(slug: string): void {
        try {
            this.validateSlug(slug);
            this.slug = slug;
            // TODO: UpdatedEvent
        } catch (e) {
            // TODO: ErrorEvent
        }
    }

    public updateActive(active: boolean): void {
        this.active = active;
        // TODO: UpdatedEvent
    }

    public delete(): void {
        if (this.isDeleted()) {
            // TODO: ErrorEvent
            throw new RpcException({
                code: HttpStatus.BAD_REQUEST,
                message: 'Entity is already deleted',
            });
        } else {
            this.deleted_at = new Date();
            this.updated_at = new Date();
            // TODO: DeletedEvent
        }
    }

    public restore(): void {
        if (!this.isDeleted()) {
            // TODO: ErrorEvent
            throw new RpcException({
                code: HttpStatus.BAD_REQUEST,
                message: 'Entity is not deleted',
            });
        } else {
            this.deleted_at = null;
            this.updated_at = new Date();
            // TODO: RestoredEvent
        }
    }

    private validateTitle(title: string): void {
        if (NotEmptyStringValidation(title.trim())) {
            throw new RpcException({
                code: HttpStatus.BAD_REQUEST,
                message: 'Title is empty',
            });
        }
    }

    private validateSlug(slug: string): void {
        if (NotEmptyStringValidation(slug.trim())) {
            throw new RpcException({
                code: HttpStatus.BAD_REQUEST,
                message: 'Slug is empty',
            });
        }
    }

    private validateAll(title: string, slug: string): void {
        const titleStatus = NotEmptyStringValidation(title);
        const slugStatus = NotEmptyStringValidation(slug);
        if (titleStatus && slugStatus) {
            throw new RpcException({
                code: HttpStatus.BAD_REQUEST,
                message: 'Title or Slug did not passed the validation',
            });
        }
    }
}