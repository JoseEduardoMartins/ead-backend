import { Request, Response } from 'express';
import { ApiError } from '../../application/error/api-error.model';
import { Video } from './video.model';
import { findAll, findById, findByActivityId, findByName, save, remove, update } from './video.service';

const getVideos = (req: Request, res: Response) => {
    if(req.query.activity_id){
        const id = Number(req.query.activity_id);
        getVideoByActivityId(res, id);
        return;
    } else if(req.query.name){
        const name = String(req.query.name);
        getVideoByName(res, name);
        return;
    }
    findAll()
        .then(data => res.status(200).json(data))
        .catch(err => res.status(500).json(new ApiError(err.message, err)));
};

const getVideoByActivityId = (res: Response, id: number) => {
    findByActivityId(id)
        .then(data => res.status(200).json(data))
        .catch(err => res.status(500).json(new ApiError(err.message, err)));
};

const getVideoByName = (res: Response, name: string) => {
    findByName(name)
        .then(data => res.status(200).json(data))
        .catch(err => res.status(500).json(new ApiError(err.message, err)));
};

const getVideo = (req: Request, res: Response) => {
    const id = Number(req.params.id);

    findById(id)
        .then(data => res.status(200).json(data))
        .catch(err => res.status(500).json(new ApiError(err.message, err)));
};

const createVideo = (req: Request, res: Response) => {
    const body: Video = req.body;

    save(body)
        .then((data) => res.status(201).json(data))
        .catch((err) => (res.status(500).json(new ApiError(err.message, err))));
};

const updateVideo = (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const body: Video = req.body;

    update(id, body)
        .then(data => {
            if (data === null) return res.status(404).json({ message: 'Not found' });

            return res.status(200).json();
        })
		.catch(err => res.status(500).json(new ApiError(err.message, err)));
};

const deleteVideo = (req: Request, res: Response) => {
    const id = Number(req.params.id);

    remove(id)
        .then(data => {
            if (data === null) return res.status(404).json({ message: 'Not found' });

            return res.status(204).json();
        })
        .catch(err => res.status(500).json(new ApiError(err.message, err)));
};

export default {
    getVideos,
    getVideo,
    createVideo,
    updateVideo,
    deleteVideo
};
