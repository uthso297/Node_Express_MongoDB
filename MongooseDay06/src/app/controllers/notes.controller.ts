import express, { Request, Response } from "express"
// import notesRoute from "../../notesRoute";
import { Note } from "../models/notes.model";

export const notesRoute = express.Router()

notesRoute.post('/create-note', async (req: Request, res: Response) => {

    const body = req.body;

    // notesRouteroach-01 of creating a data

    // const myNote = new Note({
    //     title: 'Learning Express',
    //     tags: {
    //         label: "database"
    //     }

    // })

    // await myNote.save()

    // notesRouteroach-02
    const note = await Note.create(body)

    res.status(201).json({
        success: 'true',
        message: 'note created successfully',
        note
    })
})

notesRoute.get('', async (req: Request, res: Response) => {

    const notes = await Note.find()

    res.status(201).json({
        success: 'true',
        message: 'note came successfully',
        notes
    })
})

notesRoute.get('/:noteId', async (req: Request, res: Response) => {

    const noteId = req.params.noteId

    // const note = await Note.findById(noteId)
    const note = await Note.findOne({ _id: noteId })

    res.status(201).json({
        success: 'true',
        message: 'note came successfully',
        note
    })
})

notesRoute.delete('/:noteId', async (req: Request, res: Response) => {

    const noteId = req.params.noteId

    const note = await Note.findByIdAndDelete(noteId)
    // const note = await Note.findOneAndDelete({ _id: noteId })
    // const note = await Note.deleteOne({ _id: noteId })

    res.status(201).json({
        success: 'true',
        message: 'note came successfully',
        note
    })
})

notesRoute.patch('/:noteId', async (req: Request, res: Response) => {

    const noteId = req.params.noteId
    const updatedBody = req.body
    // const note = await Note.findById(noteId)
    // const note = await Note.findByIdAndUpdate(noteId, updatedBody, { new: true })
    const note = await Note.updateOne({ _id: noteId }, updatedBody, { new: true })
    // const note = await Note.findOneAndUpdate({ _id: noteId }, updatedBody, { new: true })

    res.status(201).json({
        success: 'true',
        message: 'note updated successfully',
        note
    })
})