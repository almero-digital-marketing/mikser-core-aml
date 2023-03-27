import archieml from 'archieml'

export default ({ 
    onProcess, 
    useLogger, 
    useJournal, 
    updateEntry,
    constants: { OPERATION }
}) => {
    onProcess(async () => {
        const logger = useLogger()
            
        for await (let { id, entity } of useJournal('Aml', [OPERATION.CREATE, OPERATION.UPDATE])) {
            if (entity.content && entity.format == 'aml') {
                entity.meta = Object.assign(entity.meta || {}, archieml.load(entity.content))
                delete entity.content
                await updateEntry({ id, entity })
                logger.trace('ArchieML %s: %s', entity.collection, entity.id)
            }
        }
    })
}