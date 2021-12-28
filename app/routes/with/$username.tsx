import text from '~/styles/text'

function UserProfile() {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '300px 1fr',
        gridGap: 16,

        maxWidth: 1024,
        margin: 'auto',

        marginTop: 32,
      }}
    >
      <div>
        <h1 className={text()}>Jack Weatherilt</h1>
      </div>
      <div className={text({ weight: 'normal' })}>More content</div>
    </div>
  )
}

export default UserProfile
