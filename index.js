import archieml from 'archieml'

export default ({ 
    onProcess, 
    useLogger, 
    useJournal, 
    constants: { OPERATION }
}) => {
    onProcess(() => {
        const logger = useLogger()
            
        for (let { entity } of useJournal(OPERATION.CREATE, OPERATION.UPDATE)) {
            if (entity.content && entity.format == 'aml') {
                entity.meta = Object.assign(entity.meta || {}, archieml.load(entity.content))
                delete entity.content
                logger.trace('ArchieML %s: %s', entity.collection, entity.id)
            }
        }
    })
}